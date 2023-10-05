"use client";

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";

const Facebook = () => {
  const router = useRouter();

  const handleButton = () => {
    router.push("/");
  };

  return (
    <div>
      FACEBOOK PAGE
      <div>
        <Button variant="success">hello</Button>
        <button onClick={handleButton}>Back home</button>
      </div>
    </div>
  );
};
export default Facebook;
