import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

let page = 1;

async function getPageFile(page) {
    let { data: html } = await axios.get('http://www.lubiaoqing.com/maker/'+ page +'.html');
    let $ = cheerio.load(html);
    let promises = [];
    $('.tpl-tag-panel .thumbnail').each(function(index, item) {
        promises.push(axios.get(`http://www.lubiaoqing.com${$(this).attr('data-image')}`, { responseType: 'arraybuffer' }));
    });
    let results = await Promise.all(promises);
    results.forEach(({ data }, index) => {
        let file = `templates/${((page -1) * 4 ) + index}.jpg`;
        fs.writeFileSync(file, data);
        console.log('文件已写入！', file);
    });
}

while(page <= 6) {
    getPageFile(page);
    page++;
}
