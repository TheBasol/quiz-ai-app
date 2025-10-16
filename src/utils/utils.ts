const HEADER_COLORS: string[] = [
  'bg-gradient-to-br from-purple-600 to-purple-800',
  'bg-gradient-to-br from-blue-600 to-blue-800',
  'bg-gradient-to-br from-indigo-600 to-indigo-800',
  'bg-gradient-to-br from-violet-600 to-violet-800',
  'bg-gradient-to-br from-cyan-600 to-cyan-800',
  'bg-gradient-to-br from-teal-600 to-teal-800',
  'bg-gradient-to-br from-emerald-600 to-emerald-800',
  'bg-gradient-to-br from-green-600 to-green-800',
  'bg-gradient-to-br from-rose-600 to-rose-800',
  'bg-gradient-to-br from-pink-600 to-pink-800',
  'bg-gradient-to-br from-fuchsia-600 to-fuchsia-800',
  'bg-gradient-to-br from-slate-600 to-slate-800',
];

export const getHeaderColorById = (id?: string | number): string => {
  let index: number;

  // Si se proporciona un ID, genera un índice consistente.
  if (id !== null && id !== undefined) {
    const idAsString = id.toString();
    let hash = 0;
    for (let i = 0; i < idAsString.length; i++) {
      hash += idAsString.charCodeAt(i);
    }
    index = hash % HEADER_COLORS.length;
  } else {
    // Si no hay ID, elige un índice aleatorio como alternativa.
    index = Math.floor(Math.random() * HEADER_COLORS.length);
  }

  return HEADER_COLORS[index];
};

export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Easy': return 'text-green-400 bg-green-900/30';
        case 'Medium': return 'text-yellow-400 bg-yellow-900/30';
        case 'Hard': return 'text-red-400 bg-red-900/30';
        default: return 'text-gray-400 bg-gray-700/50';
    }   
};

export const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getIdFromSlug = (slug: string) => {
    const parts = slug.split('-');
    const actualId = parts[parts.length - 1]; // El último elemento es el ID
    const nameSlug = parts.slice(0, -1).join('-'); // Todo excepto el último elemento
    const name = nameSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { actualId, name };
}