const samplesJsonFile = "static/data/samples.json";

const elements = {
    selectDataset : d3.select("#selDataset"),
    divSampleMetadata : d3.select("#sample-metadata"),
    divBar : d3.select("#bar"),
    divGauge : d3.select("#gauge"),
    divBubble : d3.select("#bubble"),
}

function optionChanged(value)
{
    console.log(value);
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
    const data = await loadData(samplesJsonFile);
    console.log(data);
    populateSelectDataset(data.names);
    optionChanged(data.names[0]);
}


init();