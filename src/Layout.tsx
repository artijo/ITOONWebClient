import Head from "./components/Head"
export default function Layout({ children, title }: { children: React.ReactNode, title: string}) {
    return (
        <div>
            <Head title={title} />
            <div className="container mx-auto px-5">{children}</div>
        </div>
    )
}