import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Link from 'next/link'

const CodeAccess = ({ access }) => {
  const router = useRouter()

  const [client_id, setClientId] = useState('aorF1PBeUTI5n26ItF92JLgUfR304ahB14xMlvFo');
  const [dt, setDt] = useState(access);

  const logAccess = async(dt) =>{
    console.log(dt);
    localStorage.setItem("access_token", JSON.stringify(dt["access_token"]));
    localStorage.setItem("refresh_token", JSON.stringify(dt["refresh_token"]));
  }

  useEffect(() => {
      logAccess(dt)
      window.close()
  }, [])

  return (
    <div className="contenair">
      Fetch client access token... {JSON.stringify(dt)}
    </div>
  )
}

export async function getServerSideProps({ query }){
    const { code } = query;

    const res = await fetch("http://auth.dev.com:5000/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'client_id':'aorF1PBeUTI5n26ItF92JLgUfR304ahB14xMlvFo',
        'code':code,
        'grant_type':'authorization_code',
        'redirect_uri':'http://dev.com:3000/retreive_access_token',
      }),
    });

    const data = await res.json();
    console.log(data);
    if (!data) {
      return {
        props: {},
      }
    }

    return {
      props: { access: data}, // will be passed to the page component as props
    }
}

export default CodeAccess
