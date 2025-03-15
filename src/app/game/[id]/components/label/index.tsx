interface LabelProps {
  name: string
}

export function Label({ name }: LabelProps) {
  return (
    <div className="flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-50 text-center text-black rounded-lg hover:font-bold duration-300 transition">
      {name}
    </div>
  )
}
