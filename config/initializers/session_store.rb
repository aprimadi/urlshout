# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_rails_code_test_tony_franco_session',
  :secret      => '8482b424967d560717c167c9e2c5cd4e5287541ef0847fd8e07932f311c0ca82ea0a73f334ba803b5f9f4fba8e8ebf5f372bc35cec82758e439e1f9f43cc25c7'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
