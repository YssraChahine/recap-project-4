import "./Color.css";


export default function Color({ color }) {
  return <article style={{backgroundColor:color.hex, color:color.contrastText}}>
    <h3>{color.role}</h3>
    <p>{color.hex}</p>
    <p>{color.contrastText}</p>
  </article>
}
