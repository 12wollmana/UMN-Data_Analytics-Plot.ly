/**
 * Filepath to the JSON file for the data samples.
 */
const samplesJsonFile = "static/data/samples.json";

/**
 * The data for the website.
 * Use loadData to populate.
 */
let data = {};

/**
 * Elements from the HTML.
 */
const elements = {
    selectDataset : d3.select("#selDataset"),
    divSampleMetadata : d3.select("#sample-metadata"),
    divBar : d3.select("#bar"),
    divGauge : d3.select("#gauge"),
    divBubble : d3.select("#bubble"),
}

/**
 * Onchange handler for selDataset.
 * @param {string} id - The test subject ID selected.
 */
function optionChanged(id)
{
    const samples = data.samples.find(sample => sample.id === id);
    const metadata = data.metadata.find(subdata => `${subdata.id}` === id);

    populateSampleMetadata(metadata);
    populateBar(samples);
    populateGauge(samples);
    populateBubble(samples);
}

/**
 * Loads a JSON file for use in the code.
 * @param {string} jsonFile - The filepath for the JSON file.
 */
async function loadData(jsonFile)
{
    const dataset = await d3.json(jsonFile);
    return dataset;
}

/**
 * Adds options to the selDataset selection element.
 * @param {string[]} options - The options to add.
 */
function populateSelectDataset(options)
{
    const selectDataset = elements.selectDataset;
    options.forEach(option => {
        const optionElement = selectDataset.append("option");
        optionElement.text(option);
    });
}

/**
 * Creates a table within the sample-metadata div.
 * @param {any[]} metadata - The metadata to populate.
 */
function populateSampleMetadata(metadata)
{
    const divSampleMetadata = elements.divSampleMetadata;
    divSampleMetadata.html("");
    const table = divSampleMetadata.append("table");
    table.attr("class", "table table-bordered");

    const tableHead = table.append("thead");
    const headRow = tableHead.append("tr");
    const keyHead = headRow.append("th");
    keyHead.text("Key");
    const valueHead = headRow.append("th");
    valueHead.text("Value");
    
    const tableBody = table.append("tbody");
    Object.entries(metadata).forEach(([key, value]) =>
    {
        const row = tableBody.append("tr");
        const keyNode = row.append("td");
        const valueNode = row.append("td");
        keyNode.text(key);
        valueNode.text(value);
    });
}

/**
 * Creates a top bar chart for the samples.
 * @param {any[]} samples - The sample data to show.
 */
function populateBar(samples)
{
    const topIDs = samples.otu_ids.slice(0, 10).reverse();
    const topLabels = samples.otu_labels.slice(0, 10).reverse();
    const topValues = samples.sample_values.slice(0, 10).reverse();

    const otuTrace = 
    {
        name : "Top OTUs",
        type : "bar",
        orientation : "h",
        y: topIDs.map(id => `[${id}]`),
        x: topValues,
        text: topLabels
    }

    const traces = [otuTrace];

    const layout = 
    {
        title : `Top OTUs for Test Subject ${samples.id}`,
        yaxis : { title : "OTU ID"},
        xaxis : { title : "Sample Values"}
    }

    Plotly.newPlot(elements.divBar.node(), traces, layout);
}

function populateGauge(samples)
{

}

function populateBubble(samples)
{

}

async function init()
{
    data = await loadData(samplesJsonFile);
    populateSelectDataset(data.names);
    optionChanged(data.names[0]);
}

init();