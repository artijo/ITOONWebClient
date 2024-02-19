export default function Button({...props}) {
  return (
    <button className="bg-red text-white p-2 rounded-md block mx-auto mt-5" {...props}>
      {props.children}
    </button>
  )
}