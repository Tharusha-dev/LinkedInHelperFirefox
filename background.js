const httpReqUrlPattern = 'https://www.linkedin.com/voyager/api/relationships/dash/*'
const regexPatternStart = '/start=(\d+)/'
const regexPatternCount = '/count=(\d+)/'

browser.runtime.onMessage.addListener(

    function (request, sender, sendResponse) {
        sendResponse("got")
        if (request.greeting == "hello") {

            sendResponse({ farewell: "goodbye" });
            console.log("hi from background")

    

            browser.webRequest.onBeforeRequest.addListener(
                sendUrl,
                { urls: [httpReqUrlPattern], } ,// Add blocking if needed
                ["requestHeaders","blocking"]
              );

              
            
        }
        return true;
    });

    

function updateURLParameters(url, numOfCon) {
    let updatedURL = url.replace(/count=\d+/, `count=${numOfCon}`);
    updatedURL = updatedURL.replace(/start=\d+/, 'start=150');
    return updatedURL;
}



function sendUrl(reqDetails) {
    console.log("sendURL hi")
    console.log(`Loading: ${reqDetails.url}`)

    if (reqDetails != undefined) {
        var reqUrl = reqDetails.url

        browser.storage.local.get().then((val) => {
            let newUrl = updateURLParameters(reqUrl, val['numOfElements'])


            var reqHeaders = reqDetails.requestHeaders
            // console.log(`reqHeaders ${reqHeaders}`)

            var reqMethod = reqDetails.method
            console.log(`reqUrl ${reqMethod}`)

            // Convert headers to Fetch API format
            let fetchHeaders = new Headers();
            let headers = {}

            console.log(fetchHeaders.values())
            reqHeaders.forEach(header => {
                fetchHeaders.append(header.name, header.value);
                headers[header.name] = header.value
            });





            // fetch(newUrl, {
            //     method: reqMethod,
            //     headers: fetchHeaders,
            // }).then(response => {
                
            //     response.json().then((data) => {
            //         let connectionsArray = data['included'].splice(0, parseInt(val['numOfElements']))
            //         console.log(connectionsArray)
            //         let csvText = exportToCSV(connectionsArray)
            //         console.log(csvText)
            //         browser.storage.local.set({ 'csvText': csvText })
            //         browser.runtime.sendMessage({ greeting: "showCSVdownload" }, function (response) {
                   
            //         });


            //     })
            // })
            //     .catch(error => {

            //         console.error(error);
            //     });

        })


    } else {
        console.log(`says undefined ${reqDetails}`)
    }


}



function exportToCSV(connectionsArray) {
    let csv = "firstName,lastName,headline\n"
    // console.log(typeof (connectionsArray))

    connectionsArray.forEach((connection) => {
        let row = connection['firstName'] + ',' + connection['lastName'] + ',' + connection['headline'] + '\n'
        csv += row

    })

    return csv

}





// const httpReqUrlPattern = 'https://www.linkedin.com/voyager/api/relationships/dash/*';
// const regexPatternStart = '/start=(\d+)/';
// const regexPatternCount = '/count=(\d+)/';

// browser.runtime.onMessage.addListener((request) => {
//   if (request.greeting === "hello") {
//     return { farewell: "goodbye" };
//   }
// });

// browser.webRequest.onBeforeRequest.addListener(
//   sendUrl,
//   { urls: [httpReqUrlPattern] },
//   ["blocking"] // Required for modifying headers
// );

// async function updateURLParameters(url, numOfCon) {
//   let updatedURL = url.replace(regexPatternCount, `count=${numOfCon}`);
//   updatedURL = updatedURL.replace(regexPatternStart, 'start=150');
//   return updatedURL;
// }

// async function sendUrl(details) {
//   if (!details) return;

//   const url = details.url;
//   const numOfElements = await browser.storage.local.get('numOfElements');

//   if (!numOfElements.numOfElements) return; // Handle missing value

//   const newUrl = await updateURLParameters(url, numOfElements.numOfElements);

//   const headers = new Headers();
//   for (const header of details.requestHeaders) {
//     headers.append(header.name, header.value);
//   }

//   try {
//     const response = await fetch(newUrl, { method: details.method, headers });
//     const data = await response.json();
//     const connectionsArray = data['included'].slice(0, numOfElements.numOfElements);

//     // Process connectionsArray (similar to original code)

//     await browser.storage.local.set({ 'csvText': csvText });
//     browser.runtime.sendMessage({ greeting: "showCSVdownload" });
//   } catch (error) {
//     console.error(error);
//   }
// }
