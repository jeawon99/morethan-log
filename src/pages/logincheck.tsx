
import { useSession, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import AuthContent from "../components/AuthContent"

export default function Logincheck() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <AuthContent></AuthContent>
    </div>
  );
}

