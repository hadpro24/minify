import { useRouter } from 'next/router'
import Link from 'next/link'

const CodeAccess = ({ route, query }) => {
  const router = useRouter()
  const { code } = router.query

  return (
    <div className="contenair">  
      Fetch client and redirect... {code}
    </div>
  )
}

export async function getServerSideProps({ params }) {

  console.log(params)

  // const res = await fetch('http://api.dev.com:7000/films/'+params.code)
  // const film = await res.json()
  // const film = location.href;
  // console.log(location.href);
  window.close()

  return {
    props: {
      film:null,
    },
  }
}


export default CodeAccess
