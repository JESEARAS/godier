import { useMemo, useState } from 'react';
import {
  Plus, Search, Pencil, Trash2, Eye, FileDown, FileSpreadsheet, Printer,
  ChevronLeft, ChevronRight, X, Inbox, Filter,
} from 'lucide-react';
import { useCollection } from '@/hooks/useCollection';
import { useRefStore, resolveRef } from '@/hooks/useRefStore';
import { useToast } from '@/components/Toast';
import { Modal, ConfirmDialog } from '@/components/Modal';
import { PageHeader, EmptyState } from '@/components/ui';
import { formatDate, formatDateShort, money, downloadCSV } from '@/utils/format';
import type { ResourceDef } from '@/services/resources';

interface Props { resource: ResourceDef; }

const PAGE_SIZE = 8;

export function CrudPage({ resource }: Props) {
  const { items, add, update, remove } = useCollection<Record<string, unknown>>(resource.key);
  const { notify } = useToast();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [detail, setDetail] = useState<Record<string, unknown> | null>(null);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [del, setDel] = useState<Record<string, unknown> | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});

  // Collect ref keys for dropdown resolution
  const refKeys = useMemo(
    () => Array.from(new Set(resource.fields.filter((f) => f.ref).map((f) => f.ref!))),
    [resource],
  );
  const refMaps = useRefStore(refKeys);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = items.filter((it) => {
      if (!q) return true;
      return resource.searchFields.some((f) => String(it[f] ?? '').toLowerCase().includes(q));
    });
    resource.filters?.forEach((f) => {
      const v = filters[f.name];
      if (v && v !== 'Tous') list = list.filter((it) => String(it[f.name]) === v);
    });
    return list;
  }, [items, query, filters, resource]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const openAdd = () => {
    setEditing(null);
    const init: Record<string, unknown> = {};
    resource.fields.forEach((f) => {
      init[f.name] = f.type === 'checkbox' ? true : f.type === 'select' && f.options ? f.options[0] : '';
    });
    setForm(init); setFormOpen(true);
  };
  const openEdit = (it: Record<string, unknown>) => {
    setEditing(it);
    const init: Record<string, unknown> = {};
    resource.fields.forEach((f) => { init[f.name] = it[f.name]; });
    setForm(init); setFormOpen(true);
  };

  const validate = () => {
    for (const f of resource.fields) {
      if (f.required && !String(form[f.name] ?? '').trim()) {
        notify(`Le champ « ${f.label} » est requis`, 'error');
        return false;
      }
    }
    return true;
  };

  const submit = () => {
    if (!validate()) return;
    const data: Record<string, unknown> = {};
    resource.fields.forEach((f) => {
      let v = form[f.name];
      if (f.type === 'number') v = Number(v) || 0;
      if (f.type === 'checkbox') v = Boolean(v);
      data[f.name] = v;
    });
    if (editing) { update(Number(editing.id), data); notify(`${resource.singular} modifié`, 'success'); }
    else { add(data as never); notify(`${resource.singular} ajouté`, 'success'); }
    setFormOpen(false);
  };

  const confirmDelete = () => {
    if (del) { remove(Number(del.id)); notify(`${resource.singular} supprimé`, 'warning'); setDel(null); }
  };

  const exportPDF = () => {
    if (!filtered.length) { notify('Aucune donnée à exporter', 'warning'); return; }
    import('jspdf').then(({ default: jsPDF }) => {
      const doc = new jsPDF();
      doc.setFillColor(26, 97, 215); doc.rect(0, 0, 210, 24, 'F');
      doc.setTextColor(255); doc.setFontSize(15); doc.setFont('helvetica', 'bold');
      doc.text(`Clinique GODIE — ${resource.label}`, 105, 15, { align: 'center' });
      doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(120);
      doc.text(`Généré le ${formatDate(new Date().toISOString())} | ${filtered.length} enregistrement(s)`, 105, 30, { align: 'center' });
      const headers = resource.columns.map((c) => c.label);
      let y = 42;
      doc.setFontSize(8); doc.setTextColor(60); doc.setFont('helvetica', 'bold');
      doc.text(headers.join('  |  '), 14, y); y += 5;
      doc.setDrawColor(220); doc.line(14, y, 196, y); y += 6;
      doc.setFont('helvetica', 'normal'); doc.setTextColor(40);
      filtered.forEach((row) => {
        if (y > 275) { doc.addPage(); y = 20; }
        const cells = resource.columns.map((c) => formatCell(row, c, refMaps));
        const line = doc.splitTextToSize(cells.join('  |  '), 182);
        doc.text(line, 14, y); y += line.length * 5 + 1.5;
      });
      doc.save(`${resource.key}.pdf`);
      notify('Export PDF généré', 'success');
    });
  };

  const exportExcel = () => {
    if (!filtered.length) { notify('Aucune donnée à exporter', 'warning'); return; }
    const rows = filtered.map((row) => {
      const o: Record<string, unknown> = {};
      resource.columns.forEach((c) => { o[c.label] = formatCell(row, c, refMaps); });
      return o;
    });
    downloadCSV(`${resource.key}.csv`, rows);
    notify('Export Excel généré', 'success');
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <PageHeader title={resource.label} subtitle={`Gérez les ${resource.label.toLowerCase()} de la Clinique GODIE.`}
        action={<button className="btn-primary" onClick={openAdd}><Plus size={18} /> Ajouter</button>} />

      {/* Toolbar */}
      <div className="card p-4 mb-6 flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input className="input pl-11" placeholder={`Rechercher un ${resource.singular.toLowerCase()}...`}
            value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} />
        </div>
        {resource.filters?.map((f) => (
          <div key={f.name} className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            <select className="input pl-9 lg:w-44" value={filters[f.name] ?? 'Tous'}
              onChange={(e) => { setFilters({ ...filters, [f.name]: e.target.value }); setPage(1); }}>
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div className="flex gap-2">
          <button className="btn-secondary !py-2 !px-3" onClick={exportPDF} title="Export PDF"><FileDown size={16} /></button>
          <button className="btn-secondary !py-2 !px-3" onClick={exportExcel} title="Export Excel"><FileSpreadsheet size={16} /></button>
          <button className="btn-secondary !py-2 !px-3" onClick={() => window.print()} title="Imprimer"><Printer size={16} /></button>
        </div>
      </div>

      {/* Table */}
      {pageItems.length === 0 ? (
        <EmptyState icon={Inbox} title={`Aucun ${resource.singular.toLowerCase()} enregistré`}
          message={`Ajoutez votre premier ${resource.singular.toLowerCase()} pour commencer.`} />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                <tr>
                  {resource.columns.map((c) => <th key={c.name} className="text-left px-4 py-3 font-semibold whitespace-nowrap">{c.label}</th>)}
                  <th className="text-right px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pageItems.map((row) => (
                  <tr key={row.id as number} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    {resource.columns.map((c) => (
                      <td key={c.name} className="px-4 py-3 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                        {renderCell(row, c, refMaps)}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button className="btn-ghost !p-1.5" onClick={() => setDetail(row)} title="Voir"><Eye size={15} /></button>
                        <button className="btn-ghost !p-1.5" onClick={() => openEdit(row)} title="Modifier"><Pencil size={15} /></button>
                        <button className="btn-ghost !p-1.5 text-error-600" onClick={() => setDel(row)} title="Supprimer"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500">
              {filtered.length} enregistrement(s) • Page {page} / {totalPages}
            </p>
            <div className="flex gap-1">
              <button className="btn-ghost !p-1.5" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}><ChevronLeft size={16} /></button>
              <button className="btn-ghost !p-1.5" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      )}

      {/* Form modal */}
      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? `Modifier ${resource.singular.toLowerCase()}` : `Nouveau ${resource.singular.toLowerCase()}`} size="lg"
        footer={<><button className="btn-secondary" onClick={() => setFormOpen(false)}><X size={16} /> Annuler</button><button className="btn-primary" onClick={submit}>{editing ? 'Enregistrer' : 'Ajouter'}</button></>}>
        <div className="grid sm:grid-cols-2 gap-4">
          {resource.fields.map((f) => (
            <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
              <label className="label">{f.label}{f.required && <span className="text-error-500"> *</span>}</label>
              {renderField(f, form, setForm, refMaps)}
            </div>
          ))}
        </div>
      </Modal>

      {/* Detail modal */}
      <Modal open={!!detail} onClose={() => setDetail(null)} title={`Détails — ${resource.singular}`} size="md"
        footer={<button className="btn-primary" onClick={() => setDetail(null)}>Fermer</button>}>
        {detail && (
          <dl className="grid sm:grid-cols-2 gap-3">
            {resource.fields.map((f) => (
              <div key={f.name} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <dt className="text-xs text-slate-500">{f.label}</dt>
                <dd className="font-medium text-slate-700 dark:text-slate-200 break-words">
                  {f.type === 'date' ? formatDate(String(detail[f.name] ?? '')) : f.type === 'checkbox' ? (detail[f.name] ? 'Oui' : 'Non') : f.ref ? resolveRef(refMaps, f.ref!, detail[f.name], f.refLabel) : String(detail[f.name] ?? '—')}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>

      <ConfirmDialog open={!!del} title={`Supprimer ${resource.singular.toLowerCase()}`} message="Confirmer la suppression ? Cette action est irréversible."
        confirmLabel="Supprimer" onConfirm={confirmDelete} onCancel={() => setDel(null)} />
    </div>
  );
}

function renderField(
  f: import('@/services/resources').FieldDef,
  form: Record<string, unknown>,
  setForm: (v: Record<string, unknown>) => void,
  refMaps: Record<string, Record<string, unknown>[]>,
) {
  const val = form[f.name] ?? '';
  if (f.type === 'textarea')
    return <textarea className="input" rows={2} value={val as string} placeholder={f.placeholder} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />;
  if (f.type === 'select') {
    if (f.ref) {
      const list = refMaps[f.ref] ?? [];
      return (
        <select className="input" value={String(val)} onChange={(e) => setForm({ ...form, [f.name]: Number(e.target.value) })}>
          <option value="">— Sélectionner —</option>
          {list.map((i) => <option key={i.id as number} value={i.id as number}>{f.refLabel!(i)}</option>)}
        </select>
      );
    }
    return (
      <select className="input" value={String(val)} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}>
        {f.options!.map((o) => <option key={o}>{o}</option>)}
      </select>
    );
  }
  if (f.type === 'checkbox')
    return <label className="flex items-center gap-2 mt-1"><input type="checkbox" checked={Boolean(val)} onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })} className="w-5 h-5 rounded text-primary-600 focus:ring-primary-500" /> <span className="text-sm text-slate-600 dark:text-slate-300">Oui</span></label>;
  return <input type={f.type === 'tel' ? 'tel' : f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'} className="input" value={val as string} placeholder={f.placeholder} onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} />;
}

function renderCell(row: Record<string, unknown>, c: import('@/services/resources').ColumnDef, refMaps: Record<string, Record<string, unknown>[]>) {
  const raw = row[c.name];
  if (c.type === 'date') return formatDateShort(String(raw ?? ''));
  if (c.type === 'money') return money(Number(raw ?? 0));
  if (c.type === 'ref') return resolveRef(refMaps, c.ref!, raw, c.refLabel);
  if (c.type === 'badge' && c.badgeOptions) {
    const opt = c.badgeOptions[String(raw)];
    return opt ? <span className={`badge ${opt.cls}`}>{opt.label}</span> : String(raw ?? '—');
  }
  return String(raw ?? '—');
}

function formatCell(row: Record<string, unknown>, c: import('@/services/resources').ColumnDef, refMaps: Record<string, Record<string, unknown>[]>): string {
  const raw = row[c.name];
  if (c.type === 'date') return formatDateShort(String(raw ?? ''));
  if (c.type === 'money') return money(Number(raw ?? 0));
  if (c.type === 'ref') return resolveRef(refMaps, c.ref!, raw, c.refLabel);
  return String(raw ?? '—');
}
