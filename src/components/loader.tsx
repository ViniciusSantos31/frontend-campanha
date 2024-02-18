export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-10 h-10 grid grid-rows-2 grid-cols-2 relative animate-spin">
        <div className="size-2 bg-slate-900 dark:bg-slate-100 self-center justify-self-center rounded-full" />
        <div className="size-2 bg-slate-900 dark:bg-slate-100 self-center justify-self-center rounded-full" />
        <div className="size-2 bg-slate-900 dark:bg-slate-100 self-center justify-self-center rounded-full" />
        <div className="size-2 bg-slate-900 dark:bg-slate-100 self-center justify-self-center rounded-full" />
      </div>
    </div>
  );
};
