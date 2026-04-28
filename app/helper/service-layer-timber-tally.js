const { serviceLayerAPI } = require("../config/service-layer-api");
const { portalModules } = require("../config/config");

const serviceLayerURI = portalModules.OTSH;

exports.createTimberTally = async(request, quotationDocEntry, quotationDocNum, cookie) => {
    // Ensure `request` is an array
    const requests = Array.isArray(request) ? request : [request];
    console.log("*** Timber Tally helper requests count: "+requests.length);
    const results = [];
    for (const item of requests) {
        try {
            console.log("*** Timber Tally POST payload: " + JSON.stringify(item, null, 2));
            serviceLayerAPI.defaults.headers.Cookie = cookie;
            const response = await serviceLayerAPI.post(serviceLayerURI, item);
            const { DocNum, DocEntry, U_ItemCode } = response.data;
            console.log("*** Timber Tally response:**** "+JSON.stringify(response.data));
            results.push({ DocNum, DocEntry, U_ItemCode });
        } catch (error) {
            console.error(`Error creating OTSH record for item ${item.U_ItemCode}:`, error.response?.data?.error?.message?.value || error.message);
        }
    }
    return results;
}

exports.updateTimberTally = async(request, cookie) => {
    try {
        serviceLayerAPI.defaults.headers.Cookie = cookie;
        const response = await serviceLayerAPI.patch(`${serviceLayerURI}(${request.DocEntry})`, request);
        return response.data;
    } catch (error) {
        console.log("Update Timber Tally error: " + error.response?.data?.error?.message?.value || error.message);
        throw error;
    }
}
