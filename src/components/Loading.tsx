import ReactLoading from 'react-loading';

interface ExampleProps {
    type: any;
    color: string;
}

export default function Loading({ type, color }: ExampleProps) {
        return (
            <ReactLoading type={type} color={color} height={667} width={375} /> 
        )
}