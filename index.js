const puppeteer = require('puppeteer');

(async () => {
    let jobsArray = [];
    let jobsData = {
        jobTitle: '',
        jobDescription: '',
        postedDate: '',
        companyName: '',
        location: '',
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.freshersworld.com/jobs');
    const jobContainer = await page.$$('.job-container');
    for(i = 0; i < jobContainer.length; i++) {
        const title = await jobContainer[i].waitForSelector('.seo_title');
        const companyName = await jobContainer[i].waitForSelector('.latest-jobs-title');
        const jobLocation = await jobContainer[i].waitForSelector('.job-location');
        const postedAgo = await jobContainer[i].waitForSelector('.ago-text');
        const jobDesc = await jobContainer[i].waitForSelector('.desc');


        jobsData.jobTitle = await title.evaluate(ele => ele.textContent);
        jobsData.companyName = await companyName.evaluate(ele => ele.textContent);
        jobsData.location = await jobLocation.evaluate(ele => ele.textContent);
        jobsData.postedDate = await postedAgo.evaluate(ele => ele.textContent) + ' ago';
        jobsData.jobDescription = await jobDesc.evaluate(ele => ele.textContent);


        jobsArray.push(Object.assign({}, jobsData));


    }
    console.log('json data', jobsArray);
    await browser.close();
})();