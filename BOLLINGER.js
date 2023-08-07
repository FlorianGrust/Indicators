function BOLLINGER(T, MULTIPLIER, OHLC) {

  T = T ?? 20;
  MULTIPLIER = MULTIPLIER ?? 2;
  
  //Array-Format (OHLCV): [[OPEN, HIGH, LOW, CLOSE], ...]

  if(!OHLCV){throw Error(`Missing: OHLC-Array`)}

  if(OHLCV.length < T){throw Error(`OHLC-Array only has ${OHLC.length} entries, however at least ${T} entries (T) are needed.`)}

  let bollinger = {};

  OHLC = OHLC.slice(-T);

  let totalCLOSE = OHLC.reduce((CLOSE, t) => CLOSE + Number(t[3]), 0);

  bollinger.SMA = totalCLOSE / T;

  bollinger.SD = Math.sqrt(OHLC.map(t => Math.pow(Number(t[3]) - bollinger.SMA, 2)).reduce((CLOSE, t) => CLOSE + t) / T);

  bollinger.UPPER = bollinger.SMA + (MULTIPLIER * bollinger.SD);
  bollinger.LOWER = bollinger.SMA - (MULTIPLIER * bollinger.SD);

  bollinger.PERCENTAGE = (OHLC.slice(-1)[0][3] - bollinger.LOWER) / (bollinger.UPPER - bollinger.LOWER);

  return bollinger;

}
