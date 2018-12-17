class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :documents do |t|
      t.string :fileName
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
