const listoButton = document.getElementById("button");
const options = document.getElementById("options");
const textResult = document.getElementById("result");
const error = document.getElementById("errorCheck");


const dia = document.getElementById("dia");
const hora = document.getElementById("hora");
const minuto = document.getElementById("minuto");
dia.style.visibility ="hidden";
hora.style.visibility ="hidden";
minuto.style.visibility ="hidden";

const getTime = new Date();
var day;
const hour = getTime.getHours();
const minute = getTime.getMinutes();

var stationes = ['Moreno','La Reja', 'Francisco Álvarez', 'Ing. P. P. Marín', 'Las Malvinas', 'General Rodriguez', 'La Fraternidad', 'Lezica y Torrezuri', 'Univ. de Luján', 'Luján', 'Jáuregui', 'Olivera', 'Gowland', 'Mercedes'];


const trenesMercedes = [
    [   //  WORKING DAY
        [215,221,226,231,235,241,246,252,256,300,309,320,331,342],
        [323,329,334,339,343,349,354,400,404,408,417,428,439,450], 
        [437,443,448,453,457,503,508,514,518,522,531,542,553,604],
        [550,556,601,606,610,616,621,627,631,635,644,655,706,717],
        [658,704,709,714,718,724,729,735,739,743,752,803,814,825],
        [811,817,822,827,831,837,842,848,852,856,905,916,927,938],
        [925,931,936,941,945,951,956,1002,1006,1010,1019,1030,1041,1051],
        [1033,1039,1044,1049,1053,1059,1104,1110,1114,1118,1127,1138,1149,1200],
        [1145,1151,1156,1201,1205,1211,1216,1222,1226,1230,1239,1250,1301,1312],
        [1300,1306,1311,1316,1320,1326,1331,1337,1341,1345,1354,1405,1416,1427],
        [1408,1414,1419,1424,1428,1434,1439,1445,1449,1453,1502,1513,1524,1535],
        [1519,1525,1530,1535,1539,1545,1550,1556,1600,1604,1613,1624,1635,1646],
        [1635,1641,1646,1651,1655,1701,1706,1712,1716,1720,1729,1740,1751,1802],
        [1743,1749,1754,1759,1803,1809,1814,1820,1824,1828,1837,1848,1859,1910],
        [1853,1859,1904,1909,1913,1919,1924,1930,1934,1938,1947,1958,2009,2020],
        [2013,2019,2024,2029,2033,2039,2044,2050,2054,2058,2107,2118,2129,2140],
        [2128,2134,2139,2144,2148,2154,2159,2205,2209,2213,2222,2233,2244,2255],
        [2230,2236,2241,2246,2250,2256,2301,2307,2311,2314,null,null,null,null],
        [2301,2326,2337,2348,2358,2401,2411,2416,2422,2426,2431,2436,2442,2450]  /// <--dummie
    ], 
    [   //  FERIADO
        [222,345,2148,2154,2159,2205],
        [2340,2350,2300,2302,2307]
    ]
]


const timme =[];
const minut= [];
var timeStore = [];
var time = [];

var clock = (h,m) => {

    if (h == 0) {
         h = 24+h;
    }
        timeStore = [];
    
        timme.push("0"+ h.toString());
        minut.push("0"+m.toString());
        timeStore.push(timme.join('').slice(-2));
        timeStore.push(minut.join('').slice(-2));
        return parseInt(timeStore.join(""));

}

var trenes = [];

options.addEventListener("click", () => {
    if (options.value == "ir" || options.value == "llegar") {
        dia.style.visibility ="visible";
        hora.style.visibility ="visible";
        minuto.style.visibility ="visible";
    } else {
        dia.style.visibility ="hidden";
        hora.style.visibility ="hidden";
        minuto.style.visibility ="hidden";
    }
})


var llegar;
var ir;

const getTextResult = (a,b,c,d) => {

    if (b >= 2400) {
        b = b-2400;
    }
    if (d >= 2400) {
        d = d-2400;
    }


    textResult.innerHTML = [];
    textResult.innerHTML = `startTrain: ${a} at ${b} stopTrain: ${c} at ${d}`

}


listoButton.addEventListener("click", (e) => {
    e.preventDefault();

    day = getTime.getDay();
    if (dia.value == "tomorrow") {
         day = 1+day;
    } else if (dia.value == "dayAfterTomorrow") {
        day = 2+day;
    }

    var diaDeSemana = (x) => {
        if (x == 0 || x == 7) {
            return "feriado";
        } else {
            return "working day"
        }
    }

    var getTrenesMercedes = () => {
        if (diaDeSemana(day) == "working day") {
            trenes = trenesMercedes[0];
        } else {
            trenes = trenesMercedes[1];
        }
    }

    time = clock(hour,minute);

    if (options.value == "ir" || options.value == "llegar") {
        time = clock(parseInt(hora.value),parseInt(minuto.value));
    } 

    error.innerHTML = [];
    const actuallTime = clock(hour,minute);

    const errorCheck = (bollen) => {
        if (bollen < actuallTime) {
            error.innerHTML = `ojo que este tren ya fue`
            console.log(bollen, actuallTime,`ojo que este tren ya fue`)
        } else if ( bollen == "yaFue") {
            error.innerHTML = ["yaFue"];
            // console.log(bollen, "actuallTime: ", actuallTime,"dale")
        }
    }

    const errorCheckCustomTime = (bollen) => {
        if (bollen > time) {
            error.innerHTML = `ojo que este tren ya fue`
            console.log(bollen, actuallTime,`ojo que este tren ya fue`)
        } else if ( bollen == "yaFue") {
            error.innerHTML = ["yaFue"];
            console.log(bollen, "actuallTime: ", actuallTime,"dale")
        }
    }
    

    const newDay = (number) => {
        day += number;
        getTrenesMercedes();
        time = clock(1,0)
    } 


    const start = document.getElementById("start").value;
    const stop = document.getElementById("stop").value;

    var trainStore=[];
    var trainStoreCount = -1;
    var startTrain = [];
    var stopTrain = [];
    var elseCount = -2;

    llegar = undefined;
    ir = undefined;

    if (options.value == "llegar") {
        llegar = true;
    }
    if (options.value == "ir") {
        ir = true;
    }

    if (dia.value == "today" && time >= 2400 && (actuallTime > 100 && actuallTime < 2400)) {
        errorCheck("yaFue")
    }



    if (Number(start) < Number(stop)) {
        getTrenesMercedes();

        // trenes.forEach((x) => {
        //     trainStore.push(x[Number(start)]);
        // })

        // trainStore.forEach((x) => {
        //     if (x > time) {
        //         startTrain.push(x)
        //     }
        // })


    
        if (llegar == true) {  ////////////////////////////////// IDA - LLEGAR
            trainStore = [];
            startTrain = [];
            stopTrain;

            trenes.forEach((x) => {
                startTrain.push(x[Number(start)]);
                trainStore.push(x[Number(stop)]);
            })

            trainStore.forEach((x) => {
                if (x <= time) {

                    trainStoreCount++;
                    elseCount++;
                    stopTrain.push(x);

                    // console.log("start: ", startTrain[trainStoreCount])
                    // console.log("stop: ", x)

                    // if (x === null) {
                    //     trainStoreCount--;
                    //     stopTrain.pop();
                    // }
                } 
            })

            console.log("111111111111111111111111111111")
            console.log("[elseCount]: ",elseCount)
            console.log("[trainStoreCount]: ",trainStoreCount)
            console.log("startTrain: ", startTrain)
            console.log("trainStore: ", trainStore)

            console.log(stationes[Number(start)], "startTrain[trainStoreCount]: ",startTrain[trainStoreCount]);
            console.log(stationes[Number(stop)], "stopTrain[trainStoreCount]: ",stopTrain[trainStoreCount]);
            console.log("time: ", time, "actuallTime: ", actuallTime);
            getTextResult(stationes[Number(start)],startTrain[trainStoreCount],stationes[Number(stop)],stopTrain[trainStoreCount]);
            errorCheckCustomTime(startTrain[trainStoreCount]);

            if (startTrain[trainStoreCount] == undefined || stopTrain[trainStoreCount] == undefined) {

                console.log("222222222222222222222222222222222222222")
                console.log("startTrain: ", startTrain)
                console.log("trainStore: ", trainStore)

                getTextResult(stationes[Number(start)],startTrain[elseCount],stationes[Number(stop)],trainStore[elseCount]);
                
                console.log(stationes[Number(start)], "startTrain[elseCount]: ", startTrain[elseCount]);
                console.log(stationes[Number(stop)], "trainStore[elseCount]: ",trainStore[elseCount]);
                console.log("time: ", time, "actuallTime: ", actuallTime);


            } 
            
            if (startTrain[trainStoreCount] == undefined && stopTrain[trainStoreCount] == undefined) {
                // newDay(-1);

                console.log("333333333333333333333333333333333333333")
                console.log("startTrain: ", startTrain)
                console.log("trainStore: ", trainStore)


                console.log(stationes[Number(start)], "startTrain[startTrain.length-1]: ",startTrain[startTrain.length-1]);
                console.log(stationes[Number(stop)], "trainStore[trainStore.length-1]: ",trainStore[trainStore.length-1]);
                console.log("time: ", time, "actuallTime: ", actuallTime);

                getTextResult(stationes[Number(start)],startTrain[startTrain.length-1],stationes[Number(stop)],trainStore[trainStore.length-1]);

            }

            if (startTrain[trainStoreCount] == undefined || stopTrain[trainStoreCount] == undefined && (startTrain[elseCount] == undefined && stopTrain[elseCount] == undefined)) {
                // newDay(-1);

                console.log("444444444444444444444444444444444444")
                console.log("startTrain: ", startTrain)
                console.log("trainStore: ", trainStore)


                console.log(stationes[Number(start)], "startTrain[startTrain.length-1]: ",startTrain[startTrain.length-1]);
                console.log(stationes[Number(stop)], "trainStore[trainStore.length-1]: ",trainStore[trainStore.length-1]);
                console.log("time: ", time, "actuallTime: ", actuallTime);

                getTextResult(stationes[Number(start)],startTrain[startTrain.length-1],stationes[Number(stop)],trainStore[trainStore.length-1]);

            }
        }










        if (ir == true) {  ////////////////////////////////// IDA - IR
            trainStore = [];
            startTrain = [];
            stopTrain;
            trainStoreCount = 0;

            trenes.forEach((x) => {
                trainStore.push(x[Number(start)]);
                stopTrain.push(x[Number(stop)]);
            })

            trainStore.forEach((x) => {
                if (x >= time) {
                    startTrain.push(x);
                } 

                if (x < time) {
                    trainStoreCount++;
                    elseCount++;
                }
            })

            console.log("111111111111111111111111111111")
            console.log("[elseCount]: ",elseCount)
            console.log("[trainStoreCount]: ",trainStoreCount)
            console.log("startTrain: ", startTrain)
            console.log("stopTrain: ", stopTrain)

            console.log(stationes[Number(start)], "startTrain[0]: ",startTrain[0]);
            console.log(stationes[Number(stop)], "stopTrain[elseCount]: ",stopTrain[trainStoreCount]);
            console.log("time: ", time, "actuallTime: ", actuallTime);

            getTextResult(stationes[Number(start)],startTrain[0],stationes[Number(stop)],stopTrain[trainStoreCount]);
            errorCheckCustomTime(startTrain[trainStoreCount]);

            if (startTrain[0] == undefined || stopTrain[trainStoreCount] == undefined) {

                console.log("222222222222222222222222222222222222222")
                console.log("startTrain: ", startTrain)
                console.log("stopTrain: ", stopTrain)
                

                getTextResult(stationes[Number(start)],startTrain[1],stationes[Number(stop)],stopTrain[trainStoreCount+1]);
                
                console.log(stationes[Number(start)], "startTrain[elseCount]: ", startTrain[elseCount]);
                console.log(stationes[Number(stop)], "trainStore[elseCount]: ",trainStore[elseCount]);
                console.log("time: ", time, "actuallTime: ", actuallTime);


            } 
            
            // if (startTrain[0] == undefined && stopTrain[trainStoreCount] == undefined) {
            //     // newDay(-1);

            //     console.log("333333333333333333333333333333333333333")
            //     console.log("startTrain: ", startTrain)
            //     console.log("trainStore: ", trainStore)


            //     console.log(stationes[Number(start)], "startTrain[startTrain.length-1]: ",startTrain[startTrain.length-1]);
            //     console.log(stationes[Number(stop)], "trainStore[trainStore.length-1]: ",trainStore[trainStore.length-1]);
            //     console.log("time: ", time, "actuallTime: ", actuallTime);

            //     getTextResult(stationes[Number(start)],startTrain[startTrain.length-1],stationes[Number(stop)],trainStore[trainStore.length-1]);

            // }

            if (startTrain[0] == undefined || stopTrain[trainStoreCount] == undefined && (startTrain[elseCount] == undefined && stopTrain[elseCount] == undefined)) {
                // newDay(-1);
                trainStore = [];
                startTrain = [];
                stopTrain = [];
                trainStoreCount = 0;
    
                trenes.forEach((x) => {
                    trainStore.push(x[Number(start)]);
                    stopTrain.push(x[Number(stop)]);
                })
    
                trainStore.forEach((x) => {
                    // if (x >= time) {
                    //     startTrain.push(x);
                    // } 
    
                    if (x < time) {
                        startTrain.push(x);

                        trainStoreCount++;
                        elseCount++;
                    }
                })
                console.log("444444444444444444444444444444444444")
                console.log("trainStore: ", trainStore)
                console.log("stopTrain: ", stopTrain)



                console.log(stationes[Number(start)], "startTrain[0]: ",startTrain[0]);
                console.log(stationes[Number(stop)], "trainStore[trainStore.length-1]: ",stopTrain[0]);
                console.log("time: ", time, "actuallTime: ", actuallTime);

                getTextResult(stationes[Number(start)],startTrain[0],stationes[Number(stop)],stopTrain[0]);

            }
        }
    }
})