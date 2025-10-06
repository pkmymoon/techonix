import { Button } from "components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Textarea } from "components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AddDepartmentModal() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("Department 1");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate nostrum natus assumenda quos! Inventore ducimus aliquam asperiores nostrum dicta cumque ad veritatis exercitationem placeat quae at, porro dolor, labore consectetur."
  );
  const [open, setOpen] = useState(false);
  async function onSubmit() {
    console.log("hi");
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const res = await fetch(
      "https://employee-react.onrender.com/emp/add-department",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? token : "",
        },
        body: JSON.stringify({ dept_name: name, description }),
      }
    );
    const data = await res.json();
    if (res.ok) {
      setLoading(false);
      setOpen(false);
      window.location.reload();
      toast.success("Added successfully!");
    } else {
      // Registration failed
      setLoading(false);
      toast.error("Failed to add!", {
        description: data.message,
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={() => onSubmit()}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Department</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add department</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="dept_name">Name</Label>
              <Input
                id="dept_name"
                name="dept_name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="discription">discription</Label>
              <Textarea
                id="discription"
                name="discription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={() => onSubmit()}>
              {loading ? (
                <>
                  Adding... <Loader2 className="animate-spin" />
                </>
              ) : (
                "Add"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
