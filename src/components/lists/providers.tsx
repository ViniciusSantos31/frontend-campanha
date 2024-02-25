import {
  ListProviderProps,
  Provider,
  ProviderInfoProps,
} from "@/types/provider";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Separator } from "@components/ui/separator";
import { cn } from "@utils/cn";
import { StatusBadge, StatusTag } from "../status";
import { Skeleton } from "../ui/skeleton";

const ListProviders: React.FC<ListProviderProps> = ({ providers, loading }) => {
  return (
    <ul className="w-full space-y-2.5 delay-75">
      {loading
        ? Array(3)
            .fill(undefined)
            .map((_, idx) => (
              <Skeleton
                key={`skeleton-provider-${idx}`}
                className="w-full h-28 md:h-24 delay-75"
              />
            ))
        : providers.map((provider) => (
            <ProviderItem
              key={`provider-list-item-${provider.id}`}
              provider={provider}
            />
          ))}
    </ul>
  );
};

type ProviderProps = {
  provider: Provider;
};

const ProviderItem: React.FC<ProviderProps> = ({ provider }) => {
  return (
    <li
      className={cn(
        "flex flex-col items-start justify-center space-y-4 px-6 border py-6 rounded-md md:flex-row md:items-center md:justify-between md:space-y-0",
        provider.status === "OFF" && "opacity-75"
      )}
    >
      <div className="flex space-x-2.5 md:flex-1">
        <Avatar className="backdrop-grayscale">
          <AvatarImage
            className={`${provider.status === "OFF" ? "grayscale" : ""}`}
            src={provider.avatar}
          />
          <AvatarFallback>VS</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-sans font-medium text-sm">{provider.name}</p>
            {provider.status === "ON" && (
              <StatusBadge status={provider.status} />
            )}
          </div>
          <p className="font-sans font-medium text-xs text-slate-400">
            {provider.email}
          </p>
        </div>
      </div>
      <Separator className="md:hidden" />
      <div className="w-full flex items-center justify-between md:flex-1">
        <ProviderInfo
          label="Documento"
          value={provider.doc}
        />
        <StatusTag status={provider.status} />
      </div>
    </li>
  );
};

const ProviderInfo: React.FC<ProviderInfoProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col text-left items-start justify-center">
      <p className="font-sans font-medium text-sm">{value}</p>
      <p className="font-sans font-medium text-xs text-slate-400">{label}</p>
    </div>
  );
};

export default ListProviders;
