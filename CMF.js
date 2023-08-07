function CMF(T, OHLCV) { 

  T = T ?? 20;

  //Array-Format (OHLCV): [[OPEN, HIGH, LOW, CLOSE, VOLUME], ...]

  if(!OHLCV){throw Error(`Missing: OHLCV-Array`)}

  if(OHLCV.length < T){throw Error(`OHLCV-Array only has ${OHLCV.length} entries, however at least ${T} entries (T) are needed.`)}

  OHLCV = OHLCV.slice(-T);

  let [totalMFV, totalVOLUME] = [0, 0];

  OHLCV.forEach(t => {

    let [HIGH, LOW, CLOSE, VOLUME] = [Number(t[1]), Number(t[2]), Number(t[3]), Number(t[4])];

    if (VOLUME && HIGH - LOW) {

      totalMFV += (((CLOSE - LOW) - (HIGH - CLOSE)) / (HIGH - LOW)) * VOLUME;

      totalVOLUME += VOLUME;

    };

  });

  if (totalMFV && totalVOLUME) {

    return Number(totalMFV / totalVOLUME);

  } else {

    return Number(0);

  };

}
