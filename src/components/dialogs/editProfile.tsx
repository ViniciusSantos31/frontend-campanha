import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const EditProfile: React.FC = () => {
  const form = useForm();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex gap-2 items-center">
          <User size={24} />
          Editar perfil
        </DialogTitle>
        <DialogDescription>Edit your profile information.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="grid w-full items-center">
                  <Input
                    id="picture"
                    label="Avatar"
                    type="file"
                    accept="image/*"
                    className="mb-4"
                    {...field}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <Input
                  id="name"
                  label="Nome"
                  placeholder="Nome"
                  className="mb-4"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <Input
                  id="email"
                  label="E-mail"
                  placeholder="E-mail"
                  className="mb-6"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
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
