import { useTypewriter, Cursor } from 'react-simple-typewriter'

function Typer() {
    const [text] = useTypewriter({
        words: [ "🧑 👋 Hola, Dev!", "Bienvenido a mi Blog", "Soy Eduardo Loeza"],
        loop:{},
        typeSpeed: 120,
    })
    
    const h1Style = {
        fontSize: "1.9rem", // Tamaño de fuente más pequeño
    };
    
    return (
        <div>
            <h1 style={h1Style}>{text}
            <span>
                <Cursor cursorColor='blue'/>
            </span></h1>
            
        </div>
    );
}

export default Typer;
