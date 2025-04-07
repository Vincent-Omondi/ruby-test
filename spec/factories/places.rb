FactoryBot.define do
  factory :place do
    name { "MyString" }
    description { "MyText" }
    latitude { "9.99" }
    longitude { "9.99" }
    user { nil }
  end
end
