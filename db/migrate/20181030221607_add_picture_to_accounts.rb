class AddPictureToAccounts < ActiveRecord::Migration[5.1]
  def change
    add_column :accounts, :picture, :string
  end
end
