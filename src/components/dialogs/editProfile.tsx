import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const editProfileSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z
    .string({
      required_error: "O e-mail é obrigatório",
      invalid_type_error: "Insira um e-mail válido",
    })
    .email("Insira um e-mail válido"),
});

const EditProfile: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(editProfileSchema),
    mode: "all",
    defaultValues: {
      name: "Vinicius Silveira",
      email: "vncssnts31@gmail.com",
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
          edite as informações do seu perfil
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <FormField
              name="avatar"
              control={control}
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-4 mb-2">
                      <Avatar className="size-1/4">
                        <AvatarImage
                          src="https://avatars.githubusercontent.com/u/41171735?v=4"
                          alt="avatar image upload"
                        />
                      </Avatar>
                      <div className="grid w-full items-center">
                        <Input
                          id="picture"
                          label="Avatar"
                          type="file"
                          accept="image/*"
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
            <Button>Salvar</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default EditProfile;
