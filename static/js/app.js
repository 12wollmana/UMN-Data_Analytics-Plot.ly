const samplesJsonFile = "static/data/samples.json";
let data = {};

const elements = {
    selectDataset : d3.select("#selDataset"),
    divSampleMetadata : d3.select("#sample-metadata"),
    divBar : d3.select("#bar"),
    divGauge : d3.select("#gauge"),
    divBubble : d3.select("#bubble"),
}

function optionChanged(name)
{
    const samples = data.samples.find(sample => sample.id === name);
    const metadata = data.metadata.find(subdata => `${subdata.id}` === name);

    populateSampleMetadata(metadata);
    populateBar(samples);
    populateGauge(samples);
    populateBubble(samples);
}

async function loadData(jsonFile)
{
    const dataset = await d3.json(jsonFile);
    return dataset;
}

function getTopTenSamples(samples)
{

}

function populateSelectDataset(names)
{
    const selectDataset = elements.selectDataset;
    names.forEach(name => {
        const option = selectDataset.append("option");
        option.text(name);
    });
}

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

function populateBar(samples)
{

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
    console.log(data);
    populateSelectDataset(data.names);
    optionChanged(data.names[0]);
}

init();