import { PageCollecter } from '@Collector/PageCollector'

export const collectPage = (url: string) => {
    const pageCollector = new PageCollecter();
    pageCollector.collect(url)
        .then((r: any) => {
            console.log(r)
        })
}

