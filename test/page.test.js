const chai = require('chai')
const expect = chai.expect
const sinonChai = require('sinon-chai')
const chaiAsPromised = require('chai-as-promised')
const rp = require('request-promise')
chai.use(chaiAsPromised)
chai.use(sinonChai)
require('dotenv').config()

let baseUrl = process.env.BASEURLLOCAL

describe('Page Management', () => {
  

    it('Get page', async () => {
       try {
            let id = '2'
            let pageUrl = {
                url: baseUrl + `page/${id}`,
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
                json: true,
            }
          
            let result = await rp(pageUrl)
            expect(result.code).to.equal(200)
            expect(result).to.have.property('data')
            expect(result.message).to.equal('success')
        } catch (error) {
            error = error.response?.data
            expect(error.code).to.be.within(400, 500)
            expect(error).to.have.property('error')
            expect(error.error).to.satisfy((err) => {
                return err === 'servor error'
            })
        }
    })

})