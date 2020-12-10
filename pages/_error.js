function Error({ statusCode }) {
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
          This page was updated from original implementation.
      </p>
    )
  }

  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error
  //This will override the Server Side Errors(500) page that can be displayed on any page by importing, DO NOT import the one from  next/error it will provide default implemention.