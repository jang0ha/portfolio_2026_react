export default function WithLoading({ isLoading, children }) {
  if (isLoading)
    return (
      <div
        className='container'
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className='loader'></div>
      </div>
    )
  return children
}
