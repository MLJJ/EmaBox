class Account < ApplicationRecord
  validates :full_name, presence: true
  validates :picture, presence: true
  validates :user_name, presence: true
  
  mount_uploader :picture, PictureUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  public
    def getAccounts numAccount
      accounts = Account.find_by_sql(["SELECT `accounts`.* FROM `accounts` WHERE `accounts`.`id` != ?", numAccount.id])
      return accounts
    end
end
