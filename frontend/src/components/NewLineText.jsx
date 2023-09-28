export default function NewlineText(props) {
  const { text, className } = props
  if (text) {
    return text.split('<br/>').map((str, index) => (
      <p key={'text' + index} className={className}>
        {str}
      </p>
    ))
  }
}
