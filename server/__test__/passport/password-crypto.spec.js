import {cryptPassword,comparePassword} from 'passport/password-crypto'
import test from 'tape'

test('password Crypto test', async (assert) => {

  const password = '123456'

  const encrypted_password = await cryptPassword(password)
  
  console.log(encrypted_password)

  const matched = await comparePassword(password,  encrypted_password)

  assert.ok(matched)

  assert.end()
})