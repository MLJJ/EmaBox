class CreateSharedDocuments < ActiveRecord::Migration[5.2]
  def change
    create_table :shared_documents do |t|
      t.references :document, foreign_key: true
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
