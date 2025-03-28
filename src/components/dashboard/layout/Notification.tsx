"use client";

import { useSession } from "next-auth/react";

import { Button } from "@ui/button";
import { BellRing } from "lucide-react";
import { useToast } from "@hooks/use-toast";

import { notificationGreet } from "@utils/actions/notification-greet.action";

export default function Notification() {
  const { toast } = useToast();
  const { data } = useSession();

  return (
    <Button
      variant={"outline"}
      onClick={async () => {
        await notificationGreet(data?.language ?? "en").then(({ message }) =>
          toast({
            description: message,
            variant: "success",
            title: "Success!",
          })
        );
      }}
    >
      <BellRing />
    </Button>
  );
}
