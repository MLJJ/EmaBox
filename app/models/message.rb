class Message < ApplicationRecord
  belongs_to :account
  belongs_to :conversation

  after_create_commit { MessageBroadcastJob.perform_later(self) }
end
