import {expect, test} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import {createHtmlReport} from 'axe-html-reporter'

test.describe('accessibility tests', () => {
    test.describe.configure({retries: 0})

    test('chat', async ({page, browserName, isMobile}, {
        title,
        testId
    }) => {
        await page.goto("/")
        await page
            .locator(`[data-test-id="chat-input"]`)
            .waitFor()

        const accessibilityScanResults = await new AxeBuilder({page})
            .exclude('next-route-announcer')
            .analyze()
        createHtmlReport({
            results: accessibilityScanResults,
            options: {
                outputDir: 'test-results/axe-reports',
                reportFileName: `${title}-${browserName}${
                    isMobile ? '-mobile' : ''
                }.html`
            }
        })
        expect(accessibilityScanResults.violations).toEqual([])
    })
})