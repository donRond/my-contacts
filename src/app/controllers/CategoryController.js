const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    return response.status(200).json(categories);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return response.status(404).json({ error: 'Category Not Found.' });
    }

    return response.status(200).json(category);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is require' });
    }

    const category = await CategoriesRepository.create({ name });

    return response.status(201).json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name } = request.body;

    const category = await CategoriesRepository.update(id, { name });

    if (!category) {
      return response.status(404).json({ error: 'Category Not Found.' });
    }

    return response.status(200).json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    await CategoriesRepository.delete(id);

    return response.sendStatus(204);

  }
}

module.exports = new CategoryController();
