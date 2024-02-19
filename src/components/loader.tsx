import { LoaderIcon } from "lucide-react";

export const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center justify-center w-10 h-10 animate-spin">
        <LoaderIcon size={45} />
      </div>
    </div>
  );
};
