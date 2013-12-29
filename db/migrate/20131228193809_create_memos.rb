class CreateMemos < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.string :memorie
      t.string :desc

      t.timestamps
    end
  end
end
