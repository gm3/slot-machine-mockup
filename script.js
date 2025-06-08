import { getVisibleGrid, findWins, highlightWins, calculatePrize } from './slot-logic.js';

document.addEventListener('DOMContentLoaded', () => {
    // Provided JSON data as a string (truncated for brevity, use full data in real code)
    const providedTokenData = {"tokens":[{"id":"21xha7jJv3xZpuGXyY84VRtX2vvxKpQqspM5EfKhxFUN","mint":"21xha7jJv3xZpuGXyY84VRtX2vvxKpQqspM5EfKhxFUN","name":"Nullpunks","tokenPriceUSD":0.0000037800246,"priceChange24h":0,"volume24h":39923.574,"marketCapUSD":3780.0247,"currentPrice":2.8000184e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/null_1746634652690.png","createdAt":"2025-05-07T16:18:00.873Z","curveProgress":0.000107501175,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"NULL","verified":0},{"id":"G3rVwJaKE4a8g6A34qV4ujW8wfHQZNEeyP8zQWpmgFUN","mint":"G3rVwJaKE4a8g6A34qV4ujW8wfHQZNEeyP8zQWpmgFUN","name":"RageComicCoin","tokenPriceUSD":0.000003780241,"priceChange24h":0,"volume24h":2994.4626,"marketCapUSD":3780.241,"currentPrice":2.8001786e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/rage_1746632892729.png","createdAt":"2025-05-07T15:48:30.841Z","curveProgress":0.0010503412,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"RAGE","verified":0},{"id":"2ev1cuVZdESD5UxxsHFbHxUCajBvJ8C2owqK4VEzsFUN","mint":"2ev1cuVZdESD5UxxsHFbHxUCajBvJ8C2owqK4VEzsFUN","name":"ThiccCraftDreams","tokenPriceUSD":0.000003782652,"priceChange24h":0,"volume24h":4157.24,"marketCapUSD":3782.652,"currentPrice":2.8019645e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/thicc_1746632759584.png","createdAt":"2025-05-07T15:46:17.817Z","curveProgress":0.0115535315,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"THICC","verified":0},{"id":"7pmuGLLYdJ2mc7chZwEJAaxuWALAYqaVqbUwzzyHcA7D","mint":"7pmuGLLYdJ2mc7chZwEJAaxuWALAYqaVqbUwzzyHcA7D","name":"Baby Wen","tokenPriceUSD":0.0056256377,"priceChange24h":0,"volume24h":2098,"marketCapUSD":562462.1,"currentPrice":0,"lastPriceUpdate":null,"status":"locked","holderCount":3182,"tokenSupplyUiAmount":99981930,"image":"https://storage.auto.fun/token-images/f10682ae-5826-44a3-90c5-a3dd7d2b50a6-7pmuGLLYdJ2mc7chZwEJAaxuWALAYqaVqbUwzzyHcA7D-1745584847315.png","createdAt":"2025-05-07T15:38:40.946Z","curveProgress":0,"curveLimit":0,"imported":1,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"BWen","verified":0},{"id":"G4vT7PsTPiVyGa2sRxUQTCF17QzXtGE9gkbyLcpuyFUN","mint":"G4vT7PsTPiVyGa2sRxUQTCF17QzXtGE9gkbyLcpuyFUN","name":"GlitchBallet","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1630.0392,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/glitchb_1746631927305.png","createdAt":"2025-05-07T15:32:33.755Z","curveProgress":3.5294119e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"GLITCHB","verified":0},{"id":"7LT3mpsMfepWLdJQWuVpCAEadYchUPzzLKHWRTSquFUN","mint":"7LT3mpsMfepWLdJQWuVpCAEadYchUPzzLKHWRTSquFUN","name":"MemeXplosion","tokenPriceUSD":0.00000407204,"priceChange24h":0,"volume24h":1122.6381,"marketCapUSD":4072.04,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/mxpl_1746631710440.png","createdAt":"2025-05-07T15:28:55.584Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"MXPL","verified":0},{"id":"CnGDR9bsmpBWGtcQhKdmp6HkuEo65ywUZKbRQzqiHFUN","mint":"CnGDR9bsmpBWGtcQhKdmp6HkuEo65ywUZKbRQzqiHFUN","name":"CZ","tokenPriceUSD":0.0000040520254,"priceChange24h":0,"volume24h":293.93796,"marketCapUSD":4052.0254,"currentPrice":3.0015002e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/cz_1746630303505.png","createdAt":"2025-05-07T15:05:27.148Z","curveProgress":1.1647059,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CZ","verified":0},{"id":"XsnkQfofspp9qcvMnUwWvrwFfhY6nuKNtGuaDQUaFUN","mint":"XsnkQfofspp9qcvMnUwWvrwFfhY6nuKNtGuaDQUaFUN","name":"SIGMA","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":845.0713,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/sigma_1746630232933.png","createdAt":"2025-05-07T15:04:11.494Z","curveProgress":0.01164706,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"SIGMA","verified":0},{"id":"3KTmHSSoqqfBkWwm1R8iaHhKogXjRygpxQSftiAB9wtf","mint":"3KTmHSSoqqfBkWwm1R8iaHhKogXjRygpxQSftiAB9wtf","name":"SIGMA","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":1100.6613,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/sigma_1746629983136.png","createdAt":"2025-05-07T15:00:01.493Z","curveProgress":0.01164706,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"SIGMA","verified":0},{"id":"G4WT38M214pYFkCk5F3mRAnn8D5Hrug6u11AwHTT4FUN","mint":"G4WT38M214pYFkCk5F3mRAnn8D5Hrug6u11AwHTT4FUN","name":"Sigma Music","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":1144.1033,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fan_1746629864068.png","createdAt":"2025-05-07T14:58:07.324Z","curveProgress":0.01164706,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FAN","verified":0},{"id":"27o9TtTiiXASxqX5S9VKH1BNMKGw8ab8GJi9QtR6iFUN","mint":"27o9TtTiiXASxqX5S9VKH1BNMKGw8ab8GJi9QtR6iFUN","name":"DumpsterFireFame","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1400.9082,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/dff_1746629570315.png","createdAt":"2025-05-07T14:53:16.364Z","curveProgress":2.3529412e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"DFF","verified":0},{"id":"D7qqKEr7JFpAd82m9nvJL2psdPmU1oW54g1LHvDUYFAN","mint":"D7qqKEr7JFpAd82m9nvJL2psdPmU1oW54g1LHvDUYFAN","name":"Sigma Music","tokenPriceUSD":0.00010719229,"priceChange24h":0,"volume24h":652794,"marketCapUSD":107192.29,"currentPrice":4.560357e-7,"lastPriceUpdate":null,"status":"locked","holderCount":229,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fan_1746629397877.png","createdAt":"2025-05-07T14:50:09.000Z","curveProgress":100,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FAN","verified":1},{"id":"55jtN5hXYE5rY8jWQBKaHEYu6osR21vynM9toCjRQkCZ","mint":"55jtN5hXYE5rY8jWQBKaHEYu6osR21vynM9toCjRQkCZ","name":"CZAI","tokenPriceUSD":0.0000038550243,"priceChange24h":0,"volume24h":19664.922,"marketCapUSD":3855.0242,"currentPrice":2.8555736e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/czai_1746624651119.png","createdAt":"2025-05-07T13:31:24.462Z","curveProgress":0.32529685,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CZAI","verified":0},{"id":"HgbUgoxiosAmoTvyntUE6XnEMFMe4shqrzxqmDrvHtoe","mint":"HgbUgoxiosAmoTvyntUE6XnEMFMe4shqrzxqmDrvHtoe","name":"POTATOE","tokenPriceUSD":0.0000037805346,"priceChange24h":0,"volume24h":1121.8872,"marketCapUSD":3780.5347,"currentPrice":2.800396e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/toe_1746624372029.jpg","createdAt":"2025-05-07T13:26:36.496Z","curveProgress":0.002329414,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"TOE","verified":0},{"id":"4aSJuPnuAjnbixt8dhjFuGVpTwkqggV7X3JSNi5q4FUN","mint":"4aSJuPnuAjnbixt8dhjFuGVpTwkqggV7X3JSNi5q4FUN","name":"test","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1659.729,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/test_1746623152936.jpg","createdAt":"2025-05-07T13:06:13.380Z","curveProgress":2.3529412e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"test","verified":0},{"id":"GftUtgdeM9vaJ9sHgsFWjsSHCWG72gf6AUv6fF8t3ask","mint":"GftUtgdeM9vaJ9sHgsFWjsSHCWG72gf6AUv6fF8t3ask","name":"AskSplat","tokenPriceUSD":0.0000037805346,"priceChange24h":0,"volume24h":20214.535,"marketCapUSD":3780.5347,"currentPrice":2.800396e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/splat_1746622444872.jpg","createdAt":"2025-05-07T12:54:33.000Z","curveProgress":0.002329414,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"SPLAT","verified":0},{"id":"FDpPFwc2RGwqHkyfBJv1EVpuvcJUvqbFogxHJUfAjgma","mint":"FDpPFwc2RGwqHkyfBJv1EVpuvcJUvqbFogxHJUfAjgma","name":"SigmaXMusic","tokenPriceUSD":0.000003847203,"priceChange24h":0,"volume24h":18895.924,"marketCapUSD":3847.203,"currentPrice":2.84978e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/sigma_1746620888559.jpg","createdAt":"2025-05-07T12:28:34.046Z","curveProgress":0.29153335,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"SIGMA","verified":0},{"id":"GvgCmvrUa7yAp8p9voEPz8VP6Qef74HGj6JrtZdGMSCR","mint":"GvgCmvrUa7yAp8p9voEPz8VP6Qef74HGj6JrtZdGMSCR","name":"Privacy","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":11632.165,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/scrt_1746616407773.jpg","createdAt":"2025-05-07T11:13:46.543Z","curveProgress":4.7058824e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"SCRT","verified":0},{"id":"2mJt4ems6TE8v6XHfbjxoSsJaJX5N2k42aeBUWAGCCRT","mint":"2mJt4ems6TE8v6XHfbjxoSsJaJX5N2k42aeBUWAGCCRT","name":"Prince of SCRT","tokenPriceUSD":0.000003894075,"priceChange24h":0,"volume24h":11087.893,"marketCapUSD":3894.075,"currentPrice":2.8845e-8,"lastPriceUpdate":null,"status":"active","holderCount":4,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/privacy_1746616037266.jpg","createdAt":"2025-05-07T11:07:44.964Z","curveProgress":0.49336374,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"PRIVACY","verified":0},{"id":"DXJnv7vJTGofnBqjnmv59jEBXDDqAAjcTdErR9BhZAYA","mint":"DXJnv7vJTGofnBqjnmv59jEBXDDqAAjcTdErR9BhZAYA","name":"AYA","tokenPriceUSD":0.0000039318293,"priceChange24h":0,"volume24h":7131.999,"marketCapUSD":3931.829,"currentPrice":2.912466e-8,"lastPriceUpdate":null,"status":"active","holderCount":4,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/aya_1746615383183.png","createdAt":"2025-05-07T10:56:40.281Z","curveProgress":0.6550518,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"AYA","verified":0},{"id":"q856khj53DyhgbkUjc7jDCWqMEiFj1GobhewoPtRFUN","mint":"q856khj53DyhgbkUjc7jDCWqMEiFj1GobhewoPtRFUN","name":"PepegaBrew","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":0.5346,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/pepe_1746614391549.png","createdAt":"2025-05-07T10:40:15.385Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"PEPE","verified":0},{"id":"2B9BEtWLCwtmucH3mKo4VzQ14NcANDm2pjg96uaDtFUN","mint":"2B9BEtWLCwtmucH3mKo4VzQ14NcANDm2pjg96uaDtFUN","name":"MemeChefNFT","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1429.7992,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/mchf_1746613735363.png","createdAt":"2025-05-07T10:29:21.017Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"MCHF","verified":0},{"id":"2Tc4CQcssaW4a837S1PwjEot5a46YV5jGRKjCvWsNFUN","mint":"2Tc4CQcssaW4a837S1PwjEot5a46YV5jGRKjCvWsNFUN","name":"CZAI","tokenPriceUSD":0.000003847203,"priceChange24h":0,"volume24h":24022.652,"marketCapUSD":3847.203,"currentPrice":2.84978e-8,"lastPriceUpdate":null,"status":"active","holderCount":4,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/czai_1746613249933.png","createdAt":"2025-05-07T10:21:13.198Z","curveProgress":0.29153338,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CZAI","verified":0},{"id":"Fq71f3QVdMbN7Z8gHhpKYuYSrMxvCUySLBrWigqXYFUN","mint":"Fq71f3QVdMbN7Z8gHhpKYuYSrMxvCUySLBrWigqXYFUN","name":"theDAO","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1984.3434,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/dao_1746601476674.jpg","createdAt":"2025-05-07T07:05:10.212Z","curveProgress":3.5294119e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"DAO","verified":0},{"id":"5fo8oBjCcrYUL7dSujPB6CJNNBqwoooZpGjd8tum8gSf","mint":"5fo8oBjCcrYUL7dSujPB6CJNNBqwoooZpGjd8tum8gSf","name":"AffectionGem","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":2.6739452,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/cz_1746600313791.png","createdAt":"2025-05-07T06:45:37.461Z","curveProgress":0.011647059,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CZ","verified":0},{"id":"99T7u24JFqgtrgvcRiJDrEzFcC6W3mvPjtaz2HrsJc5F","mint":"99T7u24JFqgtrgvcRiJDrEzFcC6W3mvPjtaz2HrsJc5F","name":"FitFlfuencerSimp","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":2.6739452,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/cz_1746599699835.png","createdAt":"2025-05-07T06:35:23.566Z","curveProgress":0.011647059,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CZ","verified":0},{"id":"BhRo8uDN7if3jM6LQ3MRM2S6t8jwWhtkhPGAiR19pFUN","mint":"BhRo8uDN7if3jM6LQ3MRM2S6t8jwWhtkhPGAiR19pFUN","name":"HopiumDAO","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":1074.3689,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/cz_1746579264738.png","createdAt":"2025-05-07T00:54:48.445Z","curveProgress":0.01164706,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CZ","verified":0},{"id":"AKPNKsFh3R8XAeW1Jh9jfpqPEDqTfhrT2bT9bdhUJFUN","mint":"AKPNKsFh3R8XAeW1Jh9jfpqPEDqTfhrT2bT9bdhUJFUN","name":"CyberCatPunks","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":2420.0278,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/ccpunk_1746578254478.png","createdAt":"2025-05-07T00:37:57.766Z","curveProgress":3.5294119e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"CCPUNK","verified":0},{"id":"J8b7LaCMTL98sXxKb3coDAamywpgP6d6PbXqiwke4FUN","mint":"J8b7LaCMTL98sXxKb3coDAamywpgP6d6PbXqiwke4FUN","name":"RUBY","tokenPriceUSD":0.0000049740224,"priceChange24h":0,"volume24h":2933.3218,"marketCapUSD":4974.0225,"currentPrice":3.4237488e-8,"lastPriceUpdate":null,"status":"active","holderCount":9,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/ruby_1746575015097.jpg","createdAt":"2025-05-06T23:43:57.989Z","curveProgress":3.484786,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"RUBY","verified":0},{"id":"BPSFzF6LzYJdu3orp2Vy4mC3FxDNCcp5aVXHKpkVQFUN","mint":"BPSFzF6LzYJdu3orp2Vy4mC3FxDNCcp5aVXHKpkVQFUN","name":"CyberKoalaNFT","tokenPriceUSD":0.0000037826735,"priceChange24h":0,"volume24h":2191.4106,"marketCapUSD":3782.6736,"currentPrice":2.8019803e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/koala_1746568676429.png","createdAt":"2025-05-06T21:58:20.880Z","curveProgress":0.011647061,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"KOALA","verified":0},{"id":"HPCBFQMzGrQxZqkDeVkMSknF8NZa54dJQXQqqtDGpump","mint":"HPCBFQMzGrQxZqkDeVkMSknF8NZa54dJQXQqqtDGpump","name":"faze plug","tokenPriceUSD":0.0000043306645,"priceChange24h":0,"volume24h":12540,"marketCapUSD":4330.6646,"currentPrice":0,"lastPriceUpdate":null,"status":"locked","holderCount":4,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/320605a8-6174-419e-a5df-7fd1cff572fc-HPCBFQMzGrQxZqkDeVkMSknF8NZa54dJQXQqqtDGpump-1746564261896.png","createdAt":"2025-05-06T20:20:41.000Z","curveProgress":0,"curveLimit":0,"imported":1,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"PLUG","verified":0},{"id":"GyD33LU2XaYiyyHZDkY4jJAG7CAfd5FmVELdd5p1AFUN","mint":"GyD33LU2XaYiyyHZDkY4jJAG7CAfd5FmVELdd5p1AFUN","name":"Hemorrhoids","tokenPriceUSD":0.0000039694255,"priceChange24h":0,"volume24h":1727.5177,"marketCapUSD":3969.4255,"currentPrice":2.9403152e-8,"lastPriceUpdate":null,"status":"active","holderCount":5,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/hroid_1746561965129.jpg","createdAt":"2025-05-06T20:06:36.000Z","curveProgress":0.8152943,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"HROID","verified":0},{"id":"251SY6n2YCTZrvc6gjsB3fV7RvM2gX7YwaPCgW4UgFUN","mint":"251SY6n2YCTZrvc6gjsB3fV7RvM2gX7YwaPCgW4UgFUN","name":" GlitchCore","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1125.4685,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/gltc_1746558672932.png","createdAt":"2025-05-06T19:12:14.838Z","curveProgress":3.5294119e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"GLTC","verified":0},{"id":"FwPnK1pQqHBvHZqJ9CK6ZP6QEafS2bAz2e1fm2CjUSAi","mint":"FwPnK1pQqHBvHZqJ9CK6ZP6QEafS2bAz2e1fm2CjUSAi","name":"USAi","tokenPriceUSD":0.000003895813,"priceChange24h":0,"volume24h":1188.3113,"marketCapUSD":3895.8127,"currentPrice":2.8857873e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/usai_1746557471321.jpg","createdAt":"2025-05-06T18:51:33.902Z","curveProgress":0.50082356,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"USAi","verified":0},{"id":"EVN3wAXq2vGibaGy4FqpzJPFCzz9AqH5m7WR4ySRdFUN","mint":"EVN3wAXq2vGibaGy4FqpzJPFCzz9AqH5m7WR4ySRdFUN","name":"FIF","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":0,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746557153278.png","createdAt":"2025-05-06T18:46:11.616Z","curveProgress":0,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"HKAde8ooVGAp9pGMfGPXGoi4sSdw81mHXJmpWDwxeFUN","mint":"HKAde8ooVGAp9pGMfGPXGoi4sSdw81mHXJmpWDwxeFUN","name":"FIF","tokenPriceUSD":0.000004333788,"priceChange24h":0,"volume24h":615.4738,"marketCapUSD":4333.788,"currentPrice":3.2102136e-8,"lastPriceUpdate":null,"status":"active","holderCount":3,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746557052984.png","createdAt":"2025-05-06T18:44:50.606Z","curveProgress":2.3305764,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"3WWyFQUWRaQLtM4efhr6BZYkqVZRYdJp7BbUmqCKHFUN","mint":"3WWyFQUWRaQLtM4efhr6BZYkqVZRYdJp7BbUmqCKHFUN","name":"FIF","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":0.059057064,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746555700267.png","createdAt":"2025-05-06T18:21:58.254Z","curveProgress":2.3529412e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"73hFxxtkbEd59PD2WCa2eH3y8WpUNRtowPikV54VrFUN","mint":"73hFxxtkbEd59PD2WCa2eH3y8WpUNRtowPikV54VrFUN","name":"FIF","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":0,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746555129419.png","createdAt":"2025-05-06T18:12:32.228Z","curveProgress":0,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"EnGuAF61yxffqZv5ypq7iPBZWzJkuWjWh5kjuqSEEFUN","mint":"EnGuAF61yxffqZv5ypq7iPBZWzJkuWjWh5kjuqSEEFUN","name":"FIF","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1425.3141,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746552486193.png","createdAt":"2025-05-06T17:28:34.692Z","curveProgress":2.3529412e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"2B8aCT87REHm8uATaWrC1RDV5PLrQ2CYMQb4Ve5RjFUN","mint":"2B8aCT87REHm8uATaWrC1RDV5PLrQ2CYMQb4Ve5RjFUN","name":"FIF","tokenPriceUSD":0.0000037813365,"priceChange24h":0,"volume24h":2.673,"marketCapUSD":3781.3367,"currentPrice":2.80099e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746552311466.png","createdAt":"2025-05-06T17:25:43.802Z","curveProgress":0.0058235293,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"6x4gPmhUiBc6fmtp1eoDoFoBmETqhQTegTRsk2EfmFUN","mint":"6x4gPmhUiBc6fmtp1eoDoFoBmETqhQTegTRsk2EfmFUN","name":"FIF","tokenPriceUSD":0.00000401184,"priceChange24h":0,"volume24h":0,"marketCapUSD":4011.84,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746552263295.png","createdAt":"2025-05-06T17:24:47.007Z","curveProgress":0,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"84j4pkLAV7xkyhw3JrVqjAk7sxnAr9Z8mNXrfNG7sFUN","mint":"84j4pkLAV7xkyhw3JrVqjAk7sxnAr9Z8mNXrfNG7sFUN","name":"FIF","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":0,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/fif_1746552159253.png","createdAt":"2025-05-06T17:22:59.544Z","curveProgress":0,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"FIF","verified":0},{"id":"A3gzX64txzAN9GmhqGQ8Kxn1xDCRbAYrJq1fsyXWFUN","mint":"A3gzX64txzAN9GmhqGQ8Kxn1xDCRbAYrJq1fsyXWFUN","name":"Rudy","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":3267.146,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/rudy_1746549496308.png","createdAt":"2025-05-06T16:38:41.582Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"RUDY","verified":0},{"id":"J3NrhzUeKBSA3tJQjNq77zqpWJNz3FS9TrX7H7SLKcom","mint":"J3NrhzUeKBSA3tJQjNq77zqpWJNz3FS9TrX7H7SLKcom","name":"COMPUT3","tokenPriceUSD":0.001009511,"priceChange24h":0,"volume24h":6153805,"marketCapUSD":1009510.8,"currentPrice":4.560357e-7,"lastPriceUpdate":null,"status":"locked","holderCount":810,"tokenSupplyUiAmount":999999900,"image":"https://storage.auto.fun/token-images/com_1746548533616.jpg","createdAt":"2025-05-06T16:22:21.000Z","curveProgress":100,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":1,"hide_from_featured":0,"ticker":"COM","verified":1},{"id":"9UdrMc1RQVvKk7nT4Z54rmvyw2pAtz2LWvWBbbfREFUN","mint":"9UdrMc1RQVvKk7nT4Z54rmvyw2pAtz2LWvWBbbfREFUN","name":"DaliDoge","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":1611.957,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/dali_1746545960821.png","createdAt":"2025-05-06T15:39:43.045Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"DALI","verified":0},{"id":"C8cPgQDksjqa868GmCbUchimWUKk5eJNEbCe4xCscom","mint":"C8cPgQDksjqa868GmCbUchimWUKk5eJNEbCe4xCscom","name":"COM","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":18669.742,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/_com_1746543749674.png","createdAt":"2025-05-06T15:02:56.420Z","curveProgress":2.3529412e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"$COM","verified":0},{"id":"2CzdE4oLTeLBnSHLsVx9gNMcVqe61iBhkTgHAi6RPcom","mint":"2CzdE4oLTeLBnSHLsVx9gNMcVqe61iBhkTgHAi6RPcom","name":"Comput3AI","tokenPriceUSD":0.000003786723,"priceChange24h":0,"volume24h":19140.271,"marketCapUSD":3786.723,"currentPrice":2.8049799e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/_com_1746542954264.jpg","createdAt":"2025-05-06T14:49:38.581Z","curveProgress":0.029280907,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":" COM","verified":0},{"id":"Dtt8FAGeQdnbuH2L7eu7tiHcB8yy6BPTpee1RBtRaFUN","mint":"Dtt8FAGeQdnbuH2L7eu7tiHcB8yy6BPTpee1RBtRaFUN","name":"Pizza Unicorn Party","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":240.58447,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/pup_1746542949945.jpg","createdAt":"2025-05-06T14:49:35.805Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"PUP","verified":0},{"id":"QAR4hWKj2EfziFB9rhPhYm62pZ393BEhj7L3LT4vFUN","mint":"QAR4hWKj2EfziFB9rhPhYm62pZ393BEhj7L3LT4vFUN","name":"Burrito","tokenPriceUSD":0.0000037802672,"priceChange24h":0,"volume24h":166.6183,"marketCapUSD":3780.2673,"currentPrice":2.800198e-8,"lastPriceUpdate":null,"status":"active","holderCount":2,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/bur_1746540154178.png","createdAt":"2025-05-06T14:03:09.624Z","curveProgress":0.0011646259,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"BUR","verified":0},{"id":"6dZWgbQPctCtDaQpnbdP6zh3ZecQRJ9SCdWAmkhqkFUN","mint":"6dZWgbQPctCtDaQpnbdP6zh3ZecQRJ9SCdWAmkhqkFUN","name":"Comput3 AI","tokenPriceUSD":0.00000378,"priceChange24h":0,"volume24h":53.460335,"marketCapUSD":3780,"currentPrice":2.8e-8,"lastPriceUpdate":null,"status":"active","holderCount":1,"tokenSupplyUiAmount":1000000000,"image":"https://storage.auto.fun/token-images/com_1746539187887.jpg","createdAt":"2025-05-06T13:46:52.836Z","curveProgress":1.1764706e-9,"curveLimit":113000000000,"imported":0,"hidden":0,"featured":0,"hide_from_featured":0,"ticker":"COM","verified":0}],"page":1,"totalPages":35,"total":1718,"hasMore":true};

    const localFallbackSymbols = [
        { symbolId: 'zoramachine2', imageUrl: 'symbols/zoramachine2.png' }, { symbolId: 'x', imageUrl: 'symbols/x.png' }, 
        { symbolId: 'tubbygatcha2', imageUrl: 'symbols/tubbygatcha2.png' }, { symbolId: 'upstreet', imageUrl: 'symbols/upstreet.png' },
        { symbolId: 'tubbycats', imageUrl: 'symbols/tubbycats.png' }, { symbolId: 'tubbygatcha1', imageUrl: 'symbols/tubbygatcha1.png' }, 
        { symbolId: 'truck', imageUrl: 'symbols/truck.png' }, { symbolId: 'tubby-island', imageUrl: 'symbols/tubby-island.png' },
        { symbolId: 'studio', imageUrl: 'symbols/studio.png' }, { symbolId: 'safe', imageUrl: 'symbols/safe.png' }, 
        { symbolId: 'snapshot1', imageUrl: 'symbols/snapshot1.png' }, { symbolId: 'optimism-bridge', imageUrl: 'symbols/optimism-bridge.png' },
        { symbolId: 'pepehouse', imageUrl: 'symbols/pepehouse.png' }, { symbolId: 'mf_truck', imageUrl: 'symbols/mf_truck.png' }, 
        { symbolId: 'mirrorstand', imageUrl: 'symbols/mirrorstand.png' }, { symbolId: 'm3tv', imageUrl: 'symbols/m3tv.png' },
        { symbolId: 'metafactory-castle', imageUrl: 'symbols/metafactory-castle.png' }, { symbolId: 'm3-mart', imageUrl: 'symbols/m3-mart.png' }, 
        { symbolId: 'm3grow', imageUrl: 'symbols/m3grow.png' }, { symbolId: 'gnosis', imageUrl: 'symbols/gnosis.png' },
        { symbolId: 'hyperfy', imageUrl: 'symbols/hyperfy.png' }, { symbolId: 'git', imageUrl: 'symbols/git.png' }, 
        { symbolId: 'cryptovoxel', imageUrl: 'symbols/cryptovoxel.png' }, { symbolId: 'discord', imageUrl: 'symbols/discord.png' },
        { symbolId: 'boomboxhead', imageUrl: 'symbols/boomboxhead.png' }, { symbolId: 'brainstorm', imageUrl: 'symbols/brainstorm.png' }, 
        { symbolId: 'cloud', imageUrl: 'symbols/cloud.png' }, { symbolId: 'bodybg', imageUrl: 'symbols/bodybg.png' },
        { symbolId: 'body', imageUrl: 'symbols/body.png' }, { symbolId: 'bankless', imageUrl: 'symbols/bankless.png' }, 
        { symbolId: 'anata', imageUrl: 'symbols/anata.png' }, { symbolId: 'IA', imageUrl: 'symbols/IA.png' }, { symbolId: '9', imageUrl: 'symbols/9.png' },
        { symbolId: 'HypeWheels3', imageUrl: 'symbols/HypeWheels3.png' }, { symbolId: '7oroy', imageUrl: 'symbols/7oroy.png' }, 
        { symbolId: '8', imageUrl: 'symbols/8.png' }, { symbolId: '7', imageUrl: 'symbols/7.png' }, { symbolId: '5', imageUrl: 'symbols/5.png' },
        { symbolId: '6', imageUrl: 'symbols/6.png' }, { symbolId: '4', imageUrl: 'symbols/4.png' }, { symbolId: '3', imageUrl: 'symbols/3.png' }, 
        { symbolId: '2', imageUrl: 'symbols/2.png' }, { symbolId: '10', imageUrl: 'symbols/10.png' }, { symbolId: '1', imageUrl: 'symbols/1.png' }
    ];

    let config = {
        imageSymbols: [],
        symbolMasterList: [],
        slotSizePx: 75,
        visibleSymbolsPerReel: 5,
        reelStripMultiplier: 4,
        initialSpinSpeed: 50,
        maxSpinSpeed: 90,
        spinAcceleration: 2.5,
        stoppingDeceleration: 1.5,
        settleSpeedThreshold: 10,
        settleFactor: 0.25,
        snapProximity: 0.1,
        reelStopDelayMs: 300,
        initialCredits: 100,
        initialPoints: 0,
        resizeDebounceMs: 250,
    };

    const domElements = {
        slotMachine: document.querySelector('.slot-machine'),
        reels: Array.from({ length: 5 }, (_, i) => document.getElementById(`reel${i + 1}`)),
        reelsContainer: document.querySelector('.reels-container'),
        spinButton: document.getElementById('spinButton'),
        creditsDisplay: document.getElementById('creditsDisplay'),
        pointsDisplay: document.getElementById('pointsDisplay'),
    };

    const gameState = {
        isSpinning: false,
        isAnyReelActuallySpinning: false,
        credits: config.initialCredits,
        points: config.initialPoints,
        reelsState: domElements.reels.map(() => ({
            animationFrameID: null,
            currentY: 0,
            speed: 0,
            isStopping: false,
        })),
    };

    function loadFallbackSymbols() {
        console.log("Loading local fallback symbols.");
        config.symbolMasterList = localFallbackSymbols.filter(symbol => symbol.imageUrl);
        config.imageSymbols = config.symbolMasterList.map(symbol => symbol.imageUrl);
        if (config.symbolMasterList.length === 0) {
            console.error('No valid symbols in local fallback list.');
        }
    }

    function loadSymbolsFromProvidedData() {
        try {
            const data = providedTokenData;
            if (data && data.tokens && data.tokens.length > 0) {
                config.symbolMasterList = data.tokens.map(token => ({
                    symbolId: token.id,
                    imageUrl: token.image
                })).filter(symbol => symbol.imageUrl);
                config.imageSymbols = config.symbolMasterList.map(symbol => symbol.imageUrl);
                if (config.symbolMasterList.length === 0) {
                    console.warn('No valid symbols with images in provided data. Attempting fallback.');
                    loadFallbackSymbols();
                }
            } else {
                console.warn('No token data in provided data or tokens array is empty. Attempting fallback.');
                loadFallbackSymbols();
            }
        } catch (error) {
            console.error('Failed to load symbols from provided data:', error);
            loadFallbackSymbols();
        }
    }

    function getSymbolsForDebug() {
        const debugCheckbox = document.getElementById('debugCheckbox');
        if (debugCheckbox && debugCheckbox.checked) {
            return config.symbolMasterList.slice(0, 5);
        }
        return config.symbolMasterList;
    }

    function getRandomSymbolData() {
        const symbols = getSymbolsForDebug();
        if (symbols.length === 0) {
            console.error("No symbols available in symbolMasterList.");
            return { symbolId: 'error', imageUrl: '' }; // Placeholder for error
        }
        return symbols[Math.floor(Math.random() * symbols.length)];
    }

    function setGameDimensions() {
        if (domElements.slotMachine) {
            domElements.slotMachine.style.setProperty('--slot-size', `${config.slotSizePx}px`);
        }
        
        if (domElements.reelsContainer) {
            const styles = window.getComputedStyle(domElements.reelsContainer);
            const borderTop = parseFloat(styles.borderTopWidth) || 0;
            const borderBottom = parseFloat(styles.borderBottomWidth) || 0;
            const totalVerticalBorder = borderTop + borderBottom;
            const newHeight = (config.visibleSymbolsPerReel * config.slotSizePx) + totalVerticalBorder;
            domElements.reelsContainer.style.height = `${newHeight}px`;
        }
    }

    function createAndPopulateReelStrips() {
        domElements.reels.forEach((reelElement) => {
            const strip = document.createElement('div');
            strip.classList.add('emoji-strip');
            const totalSymbolsInStrip = config.visibleSymbolsPerReel * config.reelStripMultiplier;
            
            for (let i = 0; i < totalSymbolsInStrip; i++) {
                const slotSymbolDiv = document.createElement('div');
                slotSymbolDiv.classList.add('slot-symbol');
                
                const randomSymbol = getRandomSymbolData();
                slotSymbolDiv.dataset.symbolId = randomSymbol.symbolId; // Store symbolId

                const img = document.createElement('img');
                img.src = randomSymbol.imageUrl;
                slotSymbolDiv.appendChild(img);
                
                strip.appendChild(slotSymbolDiv);
            }
            reelElement.appendChild(strip);
        });
    }

    function initializeReelPositions() {
        domElements.reels.forEach((reelElement, reelIndex) => {
            const strip = reelElement.querySelector('.emoji-strip');
            if (!strip || config.slotSizePx <= 0) return;
            const initialYOffset = -(config.visibleSymbolsPerReel * config.slotSizePx);
            strip.style.transform = `translateY(${initialYOffset}px)`;
            gameState.reelsState[reelIndex].currentY = initialYOffset;
        });
    }
    
    function spinReel(reelIndex) {
        if (config.slotSizePx <= 0) {
            console.error("Cannot spin reel, slotSizePx is invalid:", config.slotSizePx);
            return; 
        }
        const reelState = gameState.reelsState[reelIndex];
        const strip = domElements.reels[reelIndex].querySelector('.emoji-strip');
        gameState.isAnyReelActuallySpinning = true;
        
        let lastTime = performance.now();

        function animationLoop(currentTime) {
            const frameTime = currentTime - lastTime;
            const deltaTime = Math.min(frameTime / (1000 / 60), 4); 
            lastTime = currentTime;

            if (reelState.isStopping) {
                reelState.speed = Math.max(0, reelState.speed - config.stoppingDeceleration * deltaTime);
                if (reelState.speed < config.settleSpeedThreshold || reelState.speed === 0) {
                    const targetSnapY = Math.round(reelState.currentY / config.slotSizePx) * config.slotSizePx;
                    const distanceToTarget = targetSnapY - reelState.currentY;
                    if (Math.abs(distanceToTarget) < config.snapProximity && reelState.speed <= (config.settleSpeedThreshold / 2) ) {
                        reelState.currentY = targetSnapY;
                        reelState.speed = 0; 
                    } else {
                        reelState.currentY += distanceToTarget * config.settleFactor * deltaTime;
                        if(reelState.speed > 0) {
                           reelState.speed = Math.max(0, reelState.speed - config.stoppingDeceleration * deltaTime * 0.5); 
                        }
                    }
                }
            } else {
                reelState.speed = Math.min(config.maxSpinSpeed, reelState.speed + config.spinAcceleration * deltaTime);
            }

            reelState.currentY += reelState.speed * deltaTime;
            
            while (reelState.currentY >= 0 && config.slotSizePx > 0) { 
                reelState.currentY -= config.slotSizePx;
                const lastChild = strip.lastElementChild;
                if (lastChild) {
                    const newSymbolData = getRandomSymbolData();
                    lastChild.dataset.symbolId = newSymbolData.symbolId; // Update symbolId
                    const img = lastChild.querySelector('img');
                    if (img) {
                        img.src = newSymbolData.imageUrl; // Update its src
                    }
                    strip.prepend(lastChild);
                }
            }

            strip.style.transform = `translateY(${reelState.currentY}px)`;

            if (reelState.isStopping && reelState.speed === 0 && Math.abs(Math.round(reelState.currentY / config.slotSizePx) * config.slotSizePx - reelState.currentY) < config.snapProximity ) {
                cancelAnimationFrame(reelState.animationFrameID);
                reelState.animationFrameID = null;
                
                gameState.isAnyReelActuallySpinning = domElements.reels.some((_, idx) => gameState.reelsState[idx].animationFrameID !== null);
                if (!gameState.isAnyReelActuallySpinning) {
                    gameState.isSpinning = false;
                    updateDisplay();
                    // After all reels have stopped, check for wins
                    const grid = getVisibleGrid(domElements, config);
                    const wins = findWins(grid);
                    if (wins.length > 0) {
                        highlightWins(wins);
                        const prize = calculatePrize(wins);
                        gameState.credits += prize;
                        updateCredits();
                    }
                }
                return;
            }
            reelState.animationFrameID = requestAnimationFrame(animationLoop);
        }

        reelState.isStopping = false;
        reelState.speed = config.initialSpinSpeed;
        if (reelState.animationFrameID) cancelAnimationFrame(reelState.animationFrameID);
        reelState.animationFrameID = requestAnimationFrame(animationLoop);
    }

    function clearWinHighlights() {
        document.querySelectorAll('.win-highlight').forEach(el => el.classList.remove('win-highlight'));
    }

    async function startSpinSequence() {
        clearWinHighlights();
        if (gameState.isSpinning || gameState.isAnyReelActuallySpinning) return;
        if (config.slotSizePx <= 0) {
            console.error("Slot size not set correctly, cannot start spin.");
            return;
        }
        if (config.symbolMasterList.length === 0) {
            console.error("Symbols not loaded, cannot start spin. Check API connection or fallback.");
            domElements.spinButton.disabled = false; // Re-enable button if symbols fail to load
            return;
        }

        gameState.isSpinning = true;
        gameState.isAnyReelActuallySpinning = true;
        updateDisplay();

        domElements.reels.forEach((_, reelIndex) => {
            spinReel(reelIndex);
        });
        
        let cumulativeDelay = 0;
        for (let i = 0; i < domElements.reels.length; i++) {
            const spinBeforeStopSignal = 1000 + Math.random() * 500; 
            cumulativeDelay += config.reelStopDelayMs + spinBeforeStopSignal; 
            setTimeout(() => {
                if (gameState.reelsState[i].animationFrameID) {
                    gameState.reelsState[i].isStopping = true;
                }
            }, cumulativeDelay);
        }
    }

    function updateDisplay() {
        domElements.creditsDisplay.textContent = gameState.credits;
        domElements.pointsDisplay.textContent = gameState.points;
        domElements.spinButton.disabled = gameState.isSpinning;
    }

    function updateCredits() {
        domElements.creditsDisplay.textContent = gameState.credits;
    }

    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (gameState.isAnyReelActuallySpinning) {
                return;
            }

            domElements.reels.forEach((reelElement, reelIndex) => {
                if (gameState.reelsState[reelIndex] && !gameState.reelsState[reelIndex].animationFrameID) { 
                    const strip = reelElement.querySelector('.emoji-strip');
                    if (strip && config.slotSizePx > 0) {
                        const currentY = gameState.reelsState[reelIndex].currentY;
                        const snappedY = Math.round(currentY / config.slotSizePx) * config.slotSizePx;
                        gameState.reelsState[reelIndex].currentY = snappedY;
                        strip.style.transition = 'none'; 
                        strip.style.transform = `translateY(${snappedY}px)`;
                    }
                }
            });
        }, config.resizeDebounceMs);
    }

    async function initGame() {
        domElements.spinButton.disabled = true;
        loadSymbolsFromProvidedData();
        if (config.symbolMasterList.length === 0) {
            console.error("CRITICAL: No symbols loaded from provided data or fallback. Game cannot start properly.");
        }
        domElements.spinButton.disabled = config.symbolMasterList.length === 0;
        createAndPopulateReelStrips();
        updateDisplay();
        domElements.spinButton.addEventListener('click', startSpinSequence);
        window.addEventListener('resize', handleResize);
        function performInitialLayout() {
            setGameDimensions();
            initializeReelPositions();
        }
        requestAnimationFrame(performInitialLayout);
    }
    initGame();
}); 

