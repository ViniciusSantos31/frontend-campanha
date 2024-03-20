import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { useAuth } from "@hooks/useAuth";
import { getFallbackAvatar } from "@utils/getFallbackAvatar";
import {
  IEditProfileSchema,
  editProfileResolver,
} from "@validations/editProfile";
import { User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const EditProfile: React.FC = () => {
  const { user } = useAuth();

  const [imagePreview, setImagePreview] = useState<File | null>(null);

  const form = useForm<IEditProfileSchema>({
    resolver: editProfileResolver,
    mode: "onChange",
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}` ?? "",
      email: user?.email ?? "",
      avatar: "",
    },
  });

  const { control } = form;

  return (
    <>
      <DialogHeader className="mb-4">
        <DialogTitle className="flex gap-2 items-center">
          <User size={24} />
          Editar perfil
        </DialogTitle>
        <DialogDescription>
          Edite as informações do seu perfil
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <FormField
              name="avatar"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4 mb-2">
                      <Avatar className="size-24">
                        {imagePreview ? (
                          <AvatarImage
                            src={URL.createObjectURL(imagePreview)}
                            alt="avatar image upload"
                          />
                        ) : (
                          <AvatarImage
                            src={user?.avatarUrl}
                            alt="avatar image"
                          />
                        )}
                        <AvatarFallback className="h-full w-full">
                          {user && getFallbackAvatar(user)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid w-full items-center">
                        <Input
                          id="picture"
                          label="Avatar"
                          type="file"
                          accept="image/*"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setImagePreview(e.target.files?.[0] ?? null);
                          }}
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="name"
                      label="Nome"
                      placeholder="Nome"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="email"
                      label="E-mail"
                      placeholder="E-mail"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className="mb-2 lg:mb-0">Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default EditProfile;
