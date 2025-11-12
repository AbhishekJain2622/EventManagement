const FormInput = ({ label, type = 'text', name, value, onChange, placeholder = '', required = true }) => (
  <label className="flex flex-col gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
    <span>{label}</span>
    <input
      className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 text-base shadow-inner focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 dark:border-slate-700 dark:bg-slate-900"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={name}
    />
  </label>
);

export default FormInput;
