import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { useAuth } from "@hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { getFallbackAvatar } from "@utils/getFallbackAvatar";
import {
  IEditProfileSchema,
  editProfileResolver,
} from "@validations/editProfile";
import { User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { queryClient } from "services/queryClient";
import { uploadImage } from "services/uploadImage";
import { me, update } from "services/users";
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
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isDirty, isLoading },
  } = form;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IEditProfileSchema) => {
      let avatarUrl;
      if (imagePreview) avatarUrl = await uploadImage(imagePreview);

      await update({ ...data, avatarUrl });
    },
    onSuccess: async () => {
      await me();
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
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
        <form
          className="space-y-4"
          onSubmit={handleSubmit((data) => mutate(data))}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <FormField
              name="avatarUrl"
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
            <div className="w-full flex flex-col items-start justify-center gap-4 lg:flex-row">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="firstName"
                        label="Primeiro nome"
                        placeholder="Primeiro nome"
                        type="text"
                        className="w-full"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="lastName"
                        label="Último nome"
                        placeholder="Último nome"
                        type="text"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <Button
              className="mb-2 lg:mb-0"
              disabled={!isDirty}
              loading={isPending || isLoading}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default EditProfile;
