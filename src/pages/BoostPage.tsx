const BoostPage = () => {
  return (
    <div className="boost-page mt-4">
      <div className="boost-content-1 p-8">
        <h1>BOOST YOUR</h1>
        <img src="lilcoin.svg" alt="LILCOIN" />
      </div>

      <div className="boost-content-2 p-8">
        <h1>Current price:</h1>

        <div className="flex gap-4">
          <img src="logo.svg" alt="LILCOIN" className="coin" />
          <h1>1000</h1>
        </div>
      </div>

      <div className="boost-content-3 p-8">
        <h2>You will get</h2>
        <h1>2 coin for each</h1>
        <h1>TAP</h1>
        <h2>Your level:     2</h2>
      </div>
    </div>
  );
}

export default BoostPage;