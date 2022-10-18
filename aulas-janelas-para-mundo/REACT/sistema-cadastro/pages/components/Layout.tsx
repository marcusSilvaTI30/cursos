import Titulo from "./Titulo";

interface LayoutProps {
    titulo: string
    children: any
}

export default function Layout(props: LayoutProps){
    return (
        <div>
            <Titulo>{props.titulo}</Titulo>
            <div>
                {props.children}
            </div>
        </div>
    )
}