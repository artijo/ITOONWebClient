export default function Head({ title }: { title: string}) {
    return (
    <div className="bg-red text-white">
        <div className="container mx-auto p-5">
            <h1 className="text-2xl">{title}</h1>
        </div>
    </div>
    )
}