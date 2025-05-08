import Script from 'next/script'

const Zalo = () => {
  return (
    <>
      <div
        className='zalo-chat-widget'
        data-oaid='1496901851017205971'
        data-welcome-message='5PIX sẵn sàng hỗ trợ bạn'
        data-autopopup='0'
        data-width=''
        data-height=''
      ></div>
      <Script src='https://sp.zalo.me/plugins/sdk.js'></Script>
    </>
  )
}

export default Zalo
